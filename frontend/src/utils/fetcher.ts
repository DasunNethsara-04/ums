import axios, { AxiosResponse } from "axios"
import UserDataInterface from "./interfaces/TypeInterface";

const fetchUsers = async () => {
    try {
        const response: AxiosResponse<any, any> = await axios.get("http://localhost:8000/admin/users/",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Invalid response");
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

const fetchModerators = async () => {
    try {
        const response: AxiosResponse<any, any> = await axios.get("http://localhost:8000/admin/moderators/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Invalid Request");
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

const fetchUserCount = async (): Promise<number> => {
    try {
        const response: AxiosResponse<{ count: number }, any> = await axios.get("http://localhost:8000/admin/users/count",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }
        );
        if (response.status === 200 && response.data.count) {
            return response.data.count;
        } else {
            throw new Error("Invalid response");
        }
    } catch (error) {
        console.error(error);
        return 0;
    }
}

const fetchModeratorCount = async (): Promise<number> => {
    try {
        const response: AxiosResponse<{ count: number }, any> = await axios.get("http://localhost:8000/admin/moderators/count",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }
        );
        if (response.status === 200 && response.data.count) {
            return response.data.count;
        } else {
            throw new Error("Invalid response");
        }
    } catch (error) {
        console.error(error);
        return 0;
    }
}

const fetchUserById = async (id: number): Promise<UserDataInterface | null> => {
    try {
        const response: AxiosResponse<UserDataInterface, any> = await axios.get(`http://localhost:8000/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Invalid response");
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

const fetchModeratorById = async (id: number): Promise<UserDataInterface | null> => {
    // Fetch moderator by id
    try {
        const response: AxiosResponse<UserDataInterface, any> = await axios.get(`http://localhost:8000/admin/moderators/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Invalid response");
            console.log(response.data)
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}


export { fetchUsers, fetchModerators, fetchUserCount, fetchModeratorCount, fetchUserById, fetchModeratorById };