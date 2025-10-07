import { useState, type FC } from "react";
import TaskModal from "./TaskModal";

interface Task {
    date: Date;
    title: string;
    description: string;
    color: string;
};

interface CalendarProps { currentDate: Date; };

const Calendar: FC<CalendarProps> = ({ currentDate }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const today = new Date();

    const openModal = (day: Date) => {
        setSelectedDate(day);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    };

    const addTask = (task: Omit<Task, "date">) => {
        if (selectedDate) { setTasks([...tasks, { ...task, date: selectedDate }]); }
    };

    /* Rendering of weekdays in grid layout */
    const renderWeekdays = () => {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
            <div className="grid grid-cols-7 mt-4">
                { weekdays.map((day) => (
                    <div key={day} className="text-center font-semibold text-change">
                        { day }
                    </div>
                )) }
            </div>
        );
    };

    const renderDays = () => {
        /* Start and end of the month that should be rendered */
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        /* To complete the grid, set the first date to be rendered as the previous sunday */
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - monthStart.getDay());

        /* To complete the grid, set the last date to be rendered as the last saturday */
        const endDate = new Date(monthEnd);
        endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = new Date(day);
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear();
                const dayTasks = tasks.filter(
                    (task) => task.date.getDate() === day.getDate() && task.date.getMonth() === day.getMonth() && task.date.getFullYear() === day.getFullYear()
                );

                days.push(
                    /* Date container */
                    <div
                        key={ day.toString() }
                        className={`p-2 h-28 border-t border-r ${isCurrentMonth ? "" : "bg-gray-100 dark:bg-gray-800"} cursor-pointer`}
                        onClick={ () => openModal(cloneDay) }
                    >
                        {/* Exhibition of the current day */}
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${isToday ? "bg-icons-main text-white" : ""}`}>
                            { day.getDate() }
                        </div>
                        
                        {/* Exhibition of the tasks of current date */}
                        <div className="mt-1 space-y-1 max-h-15 overflow-y-auto custom-scrollbar">
                            {dayTasks.map((task, index) => (
                                <div
                                    key={ index }
                                    className="p-1 text-xs text-white rounded-full text-center truncate"
                                    style={{ backgroundColor: task.color }}
                                >
                                    { task.title }
                                </div>
                            ))}
                        </div>
                    </div>
                );
                day.setDate(day.getDate() + 1); /* Goes to next date */
            }

            /* Dsiplays the date containers in a grid of 7 columns */
            rows.push(
                <div className="grid grid-cols-7" key={ day.toString() }>
                    { days }
                </div>
            );
            days = []; /* Resets for future usage */
        }
        return <div>{ rows }</div>
    };

    /* Calendar exhibition */
    return (
        <div className="container mx-auto p-4">
            { renderWeekdays() }
            { renderDays() }
            { isModalOpen && selectedDate && (
                <TaskModal
                    isOpen={ isModalOpen }
                    onClose={ closeModal }
                    onAddTask={ addTask }
                    selectedDate={ selectedDate }
                />
            )}
        </div>
    );
};

export default Calendar;