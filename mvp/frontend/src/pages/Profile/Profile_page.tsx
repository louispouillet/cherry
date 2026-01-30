import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Profile_page.css";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth, withTokenCheck } from "../../hooks/useAuth";

const Profile = () => {
    const { checkTokenValidity } = useAuth();
    const [userData, setUserData] = useState<{
        firstname: string;
        aboutMe: string;
        picture: string;
        hobbies: string
        age: number;
        city?: string;
    }>({

        firstname: "",
        picture: "",
        aboutMe: "",
        hobbies: "",
        age: 0,
        city: "",
    });

    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const [showEditCity, setShowEditCity] = useState(false);
    const [cityInput, setCityInput] = useState("");
    const [showLogout, setShowLogout] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Pas de token, impossible de récupérer le profil");
                return;
            }
            try {
                const response = await axios.get("http://localhost:3000/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = response.data;
                const birth = new Date(data.birthdate);
                if (Number.isNaN(birth.getTime())) {
                    window.alert("Invalid birthdate.");
                    return;
                }
                const today = new Date();
                let age = today.getFullYear() - birth.getFullYear();
                const m = today.getMonth() - birth.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                    age -= 1;
                }

                setUserData({
                    firstname: data.firstname || "",
                    picture: data.picture || "",
                    aboutMe: data.description || "",
                    hobbies: data.hobbies || "",
                    age: age || 0,
                    city: data.city || "",
                });
                setCityInput(data.city || "");
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    // Fermer le dropdown de logout quand on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setShowLogout(false);
            }
        };

        if (showLogout) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [showLogout]);

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        window.alert("You have been logged out.");
        navigate("/login");
    };

    const handleSaveCity = async () => {
        await withTokenCheck(async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                window.alert("No token found. Please log in again.");
                navigate("/login");
                return;
            }
            
            // Fermer la modal immédiatement
            setShowEditCity(false);
            
            try {
                await axios.put("http://localhost:3000/user",
                    { city: cityInput },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                
                setUserData({ ...userData, city: cityInput });
            } catch (error) {
                console.error("Error updating city:", error);
                // Réouvrir la modal en cas d'erreur
                setShowEditCity(true);
            }
        }, checkTokenValidity);
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>{userData.firstname} {userData.age}</h1>
                <div className="top-right-icons">

                    <div className="settings-wrapper" ref={settingsRef}>
                        <div className="icon-btn" onClick={() => setShowLogout(!showLogout)} >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-settings-icon lucide-settings">
                                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </div>

                        {showLogout && (
                            <div className="logout-dropdown">
                                <button className="logout-button" onClick={() => {
                                    setShowLogout(false);
                                    setShowConfirmLogout(true);
                                }}>Log-out
                                </button>
                            </div>
                        )}
                    </div>

                    {showConfirmLogout && (
                        <div className="logout-confirm-overlay" onClick={() => setShowConfirmLogout(false)}>
                            <div className="logout-confirm-dialog" onClick={(e) => e.stopPropagation()}>
                                <p>Are you sure you want to log-out?</p>
                                <div className="logout-confirm-buttons">
                                    <button className="confirm-btn yes-btn" onClick={handleLogoutConfirm}>Yes</button>
                                    <button className="confirm-btn no-btn" onClick={() => setShowConfirmLogout(false)}>No</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="icon-btn" onClick={() => {
                        setShowEditCity(true);
                        setCityInput("");
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-square-pen-icon lucide-square-pen">
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                        </svg>
                    </div>

                    {showEditCity && (
                        <div className="logout-confirm-overlay" onClick={() => {
                            setShowEditCity(false);
                            setCityInput(userData.city || "");
                        }}>
                            <div className="logout-confirm-dialog" onClick={(e) => e.stopPropagation()}>
                                <p>Edit your city:</p>
                                <input
                                    type="text"
                                    value={cityInput}
                                    onChange={(e) => setCityInput(e.target.value)}
                                    placeholder="Enter your city"
                                    className="city-input"
                                />
                                <div className="logout-confirm-buttons">
                                    <button className="confirm-btn yes-btn" onClick={handleSaveCity}>Save</button>
                                    <button className="confirm-btn no-btn" onClick={() => {
                                        setShowEditCity(false);
                                        setCityInput(userData.city || "");
                                    }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="image-section">
                {userData.picture ? (
                    <img src={userData.picture} alt="Profile" className="profile-picture" />
                ) : (
                    <p>No profile picture available.</p>
                )}
            </div>

            <div className="AboutMe-container">
                <div className="title-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></svg>
                    <h3>About Me</h3>
                </div>
                <p>{userData.aboutMe}</p>
            </div>

            <div className="Hobbies-container">
                <div className="title-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                    <h3>Hobbies</h3>
                </div>
                <p>{userData.hobbies}</p>
            </div>
            <NavBar />
        </div>
    )

}

export default Profile;