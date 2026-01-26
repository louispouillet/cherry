import { useEffect, useState} from "react"; 
import "./Profile_page.css";

const Profile = () => {
    const [userData, setUserData] = useState<{ firstname: string; lastname: string; aboutMe: string; pictures: string ; Hobbies: string }>({
        firstname: "",
        lastname: "",
        pictures: "",
        aboutMe: "",
        Hobbies: "",
    });
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            try {
                const response = await fetch("http://localhost:3000/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUserData({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    pictures: data.pictures,
                    aboutMe: data.aboutMe,
                    Hobbies: data.Hobbies,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }


        };
        fetchUserData();        
    }, []);

    return(
    <div className="profile-container">
        <header>
            <h1>{userData.firstname} {userData.lastname}</h1>
        </header>
            <div>
                <img src={userData.pictures} alt="Profile" className="profile-picture" />
            </div>
        </div>

    )
}

export default Profile;