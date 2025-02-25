import axios, { AxiosResponse } from "axios"

const fetchUsers = async () => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8000/admin/users/",
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
    //
}

const fetchUserCount = async (): Promise<number> => {
    try {
        const response: AxiosResponse<{ count: number }> = await axios.get("http://localhost:8000/admin/users/count",
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
        const response: AxiosResponse<{ count: number }> = await axios.get("http://localhost:8000/admin/moderators/count",
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


export { fetchUsers, fetchModerators, fetchUserCount, fetchModeratorCount }