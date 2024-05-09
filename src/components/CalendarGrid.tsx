import CalendarDay from "./CalendarDay";
import styles from "../styles/CalendarPage.module.css";

interface CalendarGridProps {
    year: number;
    month: number;
    onDayClick: (date: Date) => void,
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ year, month, onDayClick }: CalendarGridProps) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, index) =>
        new Date(year, month, index + 1)
    );

    return (
        <div className={`${styles.calendar_grid}`}>
            <div className={styles.weekday}>Sun</div>
            <div className={styles.weekday}>Mon</div>
            <div className={styles.weekday}>Tue</div>
            <div className={styles.weekday}>Wed</div>
            <div className={styles.weekday}>Thu</div>
            <div className={styles.weekday}>Fri</div>
            <div className={styles.weekday}>Sat</div>

            {Array.from({ length: firstDayOfMonth }, (_, index) => (
                <div key={`empty-${index}`} className="empty-day"></div>
            ))}

            {days.map((date) => (
               <CalendarDay 
                    key={date.toString()}
                    date={date} 
                    onClick={onDayClick} /> 
            ))}
        </div>
    );
};

export default CalendarGrid;