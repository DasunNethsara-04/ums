import axios, { AxiosResponse } from "axios";

const AuthChecker = async (): Promise<string | false> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response: AxiosResponse<{ role: string }> = await axios.post(
            "http://localhost:8000/auth/role",
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.status === 200 && response.data.role) {
            return response.data.role;
        } else {
            throw new Error("Invalid response");
        }
    } catch (err: any) {
        console.error("AuthChecker error:", err);

        if (err.response?.status === 401) {
            console.log("Token expired or invalid");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return false;
    }
};

export default AuthChecker;
