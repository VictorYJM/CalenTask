import { useState, useEffect } from "react";
import { FaWhatsapp, FaLinkedin, FaGithub, FaSun, FaMoon } from "react-icons/fa";
import CalendarNavigator from "../calendar/CalendarNavigator";
import Calendar from "../calendar/Calendar";

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined" && (localStorage.theme === "dark" || (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches))) { return true; }

        return false;
    });

    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        
        else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleTheme = () => { setIsDarkMode(prevState => !prevState); };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-main text-main shadow-md z-50">
                <div className="container mx-auto px-1.5 py-2.5 flex justify-between items-center">
                    {/* Left Navbar => Contacts */}
                    <div className="flex items-center space-x-4">
                        <a href="https://wa.me/5519995209278" target="_blank" rel="noopener noreferrer" className="social-icon-link"><FaWhatsapp size={36} /></a>
                        <a href="https://www.linkedin.com/in/victor-mimura-44a654384/" target="_blank" rel="noopener noreferrer" className="social-icon-link"><FaLinkedin size={36} /></a>
                        <a href="https://github.com/VictorYJM" target="_blank" rel="noopener noreferrer" className="social-icon-link"><FaGithub size={36} /></a>
                    </div>

                    {/* Middle Navbar => Calendar Navigator */}
                    <div className="flex items-center space-x-2">
                        <CalendarNavigator currentDate={ currentDate } setCurrentDate={ setCurrentDate }/>
                    </div>

                    {/* Right Navbar => Theme changer */}
                    <button onClick={ toggleTheme } className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                        {isDarkMode ? <FaSun size={36} /> : <FaMoon size={36} />}
                    </button>
                </div>
            </nav>
            <main className="pt-20">
                <Calendar currentDate={ currentDate } />
            </main>
        </>
    );
};

export default Header;