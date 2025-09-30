import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaWhatsapp, FaLinkedin, FaGithub, FaSun, FaMoon } from "react-icons/fa";
import type { JSX } from "react/jsx-runtime";

// Função auxiliar para obter os nomes dos meses
const getMonthName = (monthIndex: number) => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return months[monthIndex];
};

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined' && (localStorage.theme === 'dark' || (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches))) { return true; }
        return false;
    });

    // Estado para a data atual (mês e ano)
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevState => !prevState);
    };

    // --- Lógica do Calendário ---

    const today = new Date();
    const minDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    const handleMonthChange = (monthIndex: number) => {
        const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
        if (newDate >= minDate && newDate <= maxDate) {
            setCurrentDate(newDate);
        }
    };

    const handleYearChange = (year: number) => {
        const newDate = new Date(year, currentDate.getMonth(), 1);
        // Ajusta para o mês mais próximo dentro do limite se a seleção exata o ultrapassar
        if (newDate < minDate) {
            setCurrentDate(minDate);
        } else if (newDate > maxDate) {
            setCurrentDate(maxDate);
        } else {
            setCurrentDate(newDate);
        }
    };

    // Gera as opções para o dropdown de meses
    const renderMonthOptions = () => {
        const options = [];
        for (let i = 0; i < 12; i++) {
            const newDate = new Date(currentDate.getFullYear(), i, 1);
            if (newDate >= minDate && newDate <= maxDate) {
                options.push(
                    <Dropdown.Item key={i} onClick={() => handleMonthChange(i)}>
                        {getMonthName(i)}
                    </Dropdown.Item>
                );
            }
        }
        return options;
    };

    // Gera as opções para o dropdown de anos
    const renderYearOptions = () => {
        const year = today.getFullYear();
        const options: JSX.Element[] = [];
        const years = [year - 1, year, year + 1]; // Limita a 1 ano antes, o atual e 1 ano depois

        years.forEach(y => {
             // Simples verificação para ver se algum mês desse ano é válido
            const dateInYear = new Date(y, 0, 1);
            const nextYear = new Date(y + 1, 0, 1);
            if (nextYear > minDate && dateInYear < maxDate) {
                options.push(
                    <Dropdown.Item key={y} onClick={() => handleYearChange(y)}>
                        {y}
                    </Dropdown.Item>
                );
            }
        });
        return options;
    };


    return (
        <nav className="fixed top-0 left-0 w-full background-change text-change shadow-md z-50">
            <div className="container mx-auto px-1.5 py-2.5 flex justify-between items-center">
                {/* Left Navbar => Contacts */}
                <div className="flex items-center space-x-4">
                    <a href="https://wa.me/5519995209278" target="_blank" rel="noopener noreferrer" className="social-icon-link"><FaWhatsapp size={36} /></a>
                    <a href="https://www.linkedin.com/in/victor-mimura-44a654384/" target="_blank" rel="noopener noreferrer" className="social-icon-link"><FaLinkedin size={36} /></a>
                    <a href="https://github.com/VictorYJM" target="_blank" rel="noopener noreferrer" className="social-icon-link"><FaGithub size={36} /></a>
                </div>

                {/* Middle Navbar => Calendar Navigator */}
                <div className="flex items-center space-x-2">
                    {/* Dropdown para o Mês */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-month" className="calendar-dropdown-toggle">
                            {getMonthName(currentDate.getMonth())}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {renderMonthOptions()}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Dropdown para o Ano */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-year" className="calendar-dropdown-toggle">
                            {currentDate.getFullYear()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {renderYearOptions()}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Right Navbar => Theme changer */}
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                    {isDarkMode ? <FaSun size={36} /> : <FaMoon size={36} />}
                </button>
            </div>
        </nav>
    );
}

export default Header;