import axios from "axios";
import { useEffect } from "react";



const test = () => {
    async function Search() {
        try {
            const groupId = window.location.pathname.split("/")[2];
            const response = await axios.get(`http://localhost:3000/messageView/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Response data:", response.data.response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        Search();
    }, []);

    return (
        <div>
            <h1>test</h1>
        </div>
    );
}

export default test;