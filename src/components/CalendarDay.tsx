import styles from "../styles/CalendarPage.module.css";

interface CalendarDayProps {
    date: Date,
    onClick: (date: Date) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, onClick }) => {
    const handleDayClick = () => {
        onClick(date);
    }
    
    return (
        <div className={styles.calendar_day} onClick={handleDayClick}>
            {date.getDate()}
        </div>
    );
};

export default CalendarDay;