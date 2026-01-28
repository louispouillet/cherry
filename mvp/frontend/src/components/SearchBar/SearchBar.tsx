import "./SearchBar.css";
import { useState } from "react";

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="search-container">
            {isFocused && (
                <div className="center" onClick={() => setIsFocused(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </div>
            )}
            <input type="text" className="searchBar" placeholder="Search Event ..." onFocus={() => setIsFocused(true)}/>
        </div>
    );
}

export default SearchBar;