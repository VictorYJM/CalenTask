import { useMemo, type FC } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from "react-icons/fa";

const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

interface CalendarNavigatorProps {
    currentDate: Date;
    setCurrentDate: (update: Date | ((prevDate:Date) => Date)) => void;
};

const CalendarNavigator: FC<CalendarNavigatorProps> = ({ currentDate, setCurrentDate }) => {
    /* Assign min and max date limits */
    const { minDate, maxDate } = useMemo<{ minDate: Date; maxDate: Date }>(() => {
        const today = new Date();
        const min = new Date(today.getFullYear(), today.getMonth() - 12, 1);
        const max = new Date(today.getFullYear(), today.getMonth() + 12, 1);
        return { minDate: min, maxDate: max };
    }, []);

    const canGoBackMonth = currentDate > minDate;
    const canGoForwardMonth = currentDate < maxDate;

    const canGoBackYear = currentDate.getFullYear() > minDate.getFullYear();
    const canGoForwardYear = currentDate.getFullYear() < maxDate.getFullYear();

    /* Tries to navigate to previous month (arrow) */
    const handlePreviousMonth = (): void => {
        if (canGoBackMonth) {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setMonth(newDate.getMonth() - 1);
                return newDate;
            });
        }
    };

    /* Tries to navigate to next month (arrow) */
    const handleNextMonth = (): void => {
        if (canGoForwardMonth) {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setMonth(newDate.getMonth() + 1);
                return newDate;
            });
        }
    };

    /* Manage month selection from dropdown list */
    const handleMonthSelect = (index: number): void => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(index);

            if (newDate < minDate) { return minDate; }
            if (newDate > maxDate) { return maxDate; }

            return newDate;
        });
    };

    /* Managing the change of year (arrow) */
    const handleYearChange = (increment: number): void => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setFullYear(newDate.getFullYear() + increment);

            if (newDate < minDate) { return minDate; }
            if (newDate > maxDate) { return maxDate; }

            return newDate;
        });
    };

    return (
        <div className="relative flex items-center justify-center min-w-[280px] gap-x-3 rounded-2xl">
            {/* Month navigator by arrows (previous) */}
            <button
                onClick={handlePreviousMonth}
                className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover-arrows"
                disabled={!canGoBackMonth}
            >
                <FaChevronLeft />
            </button>

            <div className="text-center mx-4 flex items-center space-x-4">
                {/* Month Section */}
                <Menu as="div" className="relative inline-block text-left">
                    {/* Month exhibition */}
                    <MenuButton className="inline-flex items-center justify-center gap-x-2 font-semibold text-lg capitalize cursor-pointer">
                        <span className="w-24 text-left">{monthNames[currentDate.getMonth()]}</span>
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute left-0 z-10 mt-3 w-40 origin-top-left rounded-md bg-change shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                    >
                        <div>
                            {monthNames.map((month, index) => (
                                <MenuItem key={month}>
                                    <button
                                        onClick={ () => handleMonthSelect(index) }
                                        className="block w-full px-4 py-2 text-left text-sm text-change menu-items"
                                    >
                                        {month}
                                    </button>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>

                {/* Year Section */}
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg">{currentDate.getFullYear()}</span>

                    {/* Year navigation */}
                    <div className="flex flex-col">
                        {/* Year navigation by arrow (next) */}
                        <button
                            onClick={ () => handleYearChange(1) }
                            className="p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover-arrows"
                            disabled={!canGoForwardYear}
                        >
                            <FaChevronUp size={12} />
                        </button>

                        {/* Year navigation by arrow (previous) */}
                        <button
                            onClick={ () => handleYearChange(-1) }
                            className="p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover-arrows"
                            disabled={!canGoBackYear}
                        >
                            <FaChevronDown size={12} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Month navigation by arrow (next) */}
            <button
                onClick={handleNextMonth}
                className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover-arrows"
                disabled={!canGoForwardMonth}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default CalendarNavigator;