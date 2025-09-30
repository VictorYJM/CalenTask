import { addMonths, startOfMonth, subMonths } from "date-fns";
import { useState, useMemo } from "react";
 

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
}

export const useCalendar = (initialDate: Date = new Date()) => {
    const [currentDate, setCurrentDate] = useState(startOfMonth(initialDate));
    const [isEditing, setIsEditing] = useState(false);

    const navigationLimits = useMemo(() => {
        const today = new Date();
        return {
            past: startOfMonth(subMonths(today, 12)),
            future: startOfMonth(addMonths(today, 12)),
        };
    }, [])
}