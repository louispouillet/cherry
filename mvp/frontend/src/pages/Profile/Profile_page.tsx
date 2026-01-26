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
        <>
            <div>
                <header className="profile-header">
                    <h1>Louis, 22</h1>
                    <button className="bouton-parametre"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx="12" cy="12" r="3" /></svg></button>

                    {/*<h1>{userData.firstname} {userData.lastname}</h1>*/}

                </header>

                {/* <div>
                <img src={userData.pictures} alt="Profile" className="profile-picture" />
            </div> */}


                <div className="image-section">
                    <img src={"https://i.postimg.cc/9QyY95RC/image.png"} alt="Profile" className="profile-picture" />
                    {/* {userData.pictures ? (
                    <img src={"https://i.postimg.cc/9QyY95RC/image.png"} alt="Profile" className="profile-picture" />
                ) : (
                    <p>No profile picture available.</p>
                )} */}
                </div>

                <div className="AboutMe-section h2">
                    <h2>About Me</h2>
                    <p>{userData.aboutMe}</p>
                </div>

                <div className="Hobbies-section h2">
                    <h2>Hobbies</h2>
                    <p>{userData.hobbies}</p>
                </div>
            </div>
            <NavBar />
        </>
    )

}

export default Profile;