import { Calendars as CalendarModel } from "../models/calendars"
import { formatDateTime } from "../utils/formatDate";
import styles from "../styles/CalendarPage.module.css";
import { Button, Card } from "react-bootstrap";

interface CalendarProps {
    calendarForm: CalendarModel,
    className?: string,
    onCalendarClicked: (calendar: CalendarModel) => void,
    onDeleteCalendarClicked: (calendar: CalendarModel) => void,
}

const Calendar = ({ calendarForm, className, onCalendarClicked, onDeleteCalendarClicked }: CalendarProps) => {

    const {
        date,
        title,
        description,
        location,
        startTime,
        endTime,
        createdAt,
        updatedAt,
    } = calendarForm;

    const parsedDate = new Date(date);

    let createdUpdatedCalendar: string;
    if (updatedAt > createdAt) {
        createdUpdatedCalendar = "Calendar Updated: " + formatDateTime(updatedAt);
    } else {
        createdUpdatedCalendar = "Calendar Created: " + formatDateTime(createdAt);
    }

    return (
        <>
            <br />
            <Card className={styles.card} onClick={() => onCalendarClicked(calendarForm)}>
                <Card.Title className={styles.Title}>
                    <center><b>Event</b></center>
                </Card.Title>
                <Card.Body className={styles.calendarContents}>
                    Date: {parsedDate.toDateString()} <br />
                    Title: {title} <br />
                    Description: {description} <br />
                    Location: {location} <br />
                    Start Time: {startTime} <br />
                    End Time: {endTime} <br />
                    <br />
                    <center>
                        <Button
                            onClick={() => {
                                onDeleteCalendarClicked(calendarForm)
                            } }
                            variant="success">
                                Delete Event
                        </Button>
                    </center>
                </Card.Body>
                <Card.Footer>
                    Event Made: {formatDateTime(createdAt)}
                </Card.Footer>
            </Card><br />
        </>
    );
}

export default Calendar;