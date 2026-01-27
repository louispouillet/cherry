import { useEffect, useState } from "react";
import "./Profile_page.css";
import NavBar from "../../components/NavBar/NavBar";

const Profile = () => {
    const [userData, setUserData] = useState<{
        firstname: string;
        lastname: string;
        aboutMe: string;
        pictures: string;
        hobbies: string
    }>({

        firstname: "",
        lastname: "",
        pictures: "",
        aboutMe: "",
        hobbies: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/profile");
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();

                setUserData({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    pictures: data.pictures,
                    aboutMe: data.aboutMe,
                    hobbies: data.hobbies,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>Louis, 22</h1>
                <div className="top-right-icons">
                    <button className="icon-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx="12" cy="12" r="3" /></svg></button>
                    <button className="icon-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg></button>
                </div>
                {/*<h1>{userData.firstname} {userData.lastname}</h1>*/}
            </header>

            <div className="image-section">
                <img src={"https://i.postimg.cc/9QyY95RC/image.png"} alt="Profile" className="profile-picture" />
                {/* {userData.pictures ? (
                    <img src={"https://i.postimg.cc/9QyY95RC/image.png"} alt="Profile" className="profile-picture" />
                ) : (
                    <p>No profile picture available.</p>
                )} */}
            </div>

            <div className="AboutMe-container">
                <div className="title-with-icon">
                    <button className="icon-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-user-icon lucide-book-user"><path d="M15 13a3 3 0 1 0-6 0"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/></svg></button>
                    <h2>About Me</h2>
                </div>
                <p>Je suis un Vegegay </p>
                <p>{userData.aboutMe}</p>
            </div>

            <div className="Hobbies-container">
                <div className="title-with-icon">
                    <button className="icon-btn"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 -2 20 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-heart-icon lucide-house-heart"><path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></button>
                    <h2>Hobbies</h2>
                </div>
                <p>Sortir en ville, écouter de la musique, et lire des livres.</p>
                <p>{userData.hobbies}</p>
            </div>

            <NavBar />
        </div>
    )

}

export default Profile;