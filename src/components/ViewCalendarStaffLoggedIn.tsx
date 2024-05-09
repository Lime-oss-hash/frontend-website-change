import { useEffect, useState } from "react";
import { Calendars as CalendarModel } from "../models/calendars";
import * as WebsitesApi from "../network/websites_api";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import styles from "../styles/CalendarPage.module.css";
import Calendar from "./Calendar";
import { FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa";
import AddEditCalendarDialog from "./AddEditCalendarDialog";
import CalendarGrid from "./CalendarGrid";

const ViewCalendarStaffLoggedIn = () => {

    const [calendars, setCalendars] = useState<CalendarModel[]>([]);
    const [calendarsLoading, setCalendarsLoading] = useState(true);
    const [showCalendarsLoadingError, setShowCalendarsLoadingError] = useState(false);

    const [showAddCalendarDialog, setShowAddCalendarDialog] = useState(false);
    const [calendarToEdit, setCalendarToEdit] = useState<CalendarModel | null>(null);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const [monthNames] = useState([
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "OCtober", "November", "December"
    ]);

    const [dayNames] = useState([
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]);

    const [year, setYear] = useState<number | undefined>(undefined);
    const [month, setMonth] = useState<number | undefined>(undefined);
    const [date, setDate] = useState<number | undefined>(undefined);
    const [day, setDay] = useState<number | undefined>(undefined);
    const [monthSpelled, setMonthSpelled] = useState<string | undefined>(undefined);
    const [daySpelled, setDaySpelled] = useState<string | undefined>(undefined);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const day = currentDate.getDay();
        const monthSpelled = monthNames[month];
        const daySpelled = dayNames[day];

        setYear(year);
        setMonth(month);
        setDate(date);
        setDay(day);
        setMonthSpelled(monthSpelled);
        setDaySpelled(daySpelled);

        async function loadCalendars() {
            try {
                setShowCalendarsLoadingError(false);
                setCalendarsLoading(true);
                const calendars = await WebsitesApi.fetchCalendars();
                setCalendars(calendars);
            } catch (error) {
                console.error(error);
                setShowCalendarsLoadingError(true);
            } finally {
                setCalendarsLoading(false);
            }
        }
        loadCalendars();
    }, [currentDate, monthNames, dayNames]);

    async function deleteCalendar(calendar: CalendarModel) {
        try {
            await WebsitesApi.deleteCalendars(calendar._id);
            setCalendars(calendars.filter(existingCalendar => existingCalendar._id !== calendar._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const goToNextMonth = () => {
        const newDate = new Date(year || 0, (month || 0) + 1, 1);
        setCurrentDate(newDate);
    };

    const goToPreviousMonth = () => {
        const oldDate = new Date(year || 0, (month || 0) - 1, 1);
        setCurrentDate(oldDate);
    }

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
        setShowAddCalendarDialog(true);
    }

    return (
        <>
        <br />
            {calendarsLoading && <Spinner animation="border" variant="primary" />}
            {showCalendarsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!calendarsLoading && !showCalendarsLoadingError &&
                <>
                    <p className={styles.calendarTitle}><center>Waka Eastern Bay Community Transport Calendar</center></p><br /><br />
                    <div className={styles.headerContainer}>
                        <Button className={styles.previous} onClick={goToPreviousMonth}><FaAngleLeft />Previous Month</Button><br />
                        <p className={styles.Date}><center><b>{monthSpelled} {year}</b></center></p>
                        <Button className={styles.next} onClick={goToNextMonth}>Next Month<FaAngleRight /></Button>
                    </div>
                    <p><CalendarGrid year={year || 0} month={month || 0} onDayClick={handleDayClick} /></p>
                    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.calendarsGrid}`}>
                        {calendars.map(calendar => (
                        <Col key={calendar._id}>
                            <Calendar
                            calendarForm={calendar}
                            className={styles.calendar}
                            onCalendarClicked={setCalendarToEdit}
                            onDeleteCalendarClicked={deleteCalendar}
                            />
                        </Col>
                        ))}
                    </Row>
                    <br /><br /><br />
                </>
            }
            {showAddCalendarDialog &&
                <AddEditCalendarDialog
                selectedDate={selectedDate}
                onDismiss={() => setShowAddCalendarDialog(false)}
                onCalendarSaved={(newCalendar) => {
                    newCalendar.date = selectedDate?.toISOString() || "";
                    setCalendars([...calendars, newCalendar]);
                    setShowAddCalendarDialog(false);
                }} 
                />
            }
            {calendarToEdit &&
                <AddEditCalendarDialog
                calendarToEdit={calendarToEdit}
                onDismiss={() => {
                    setShowAddCalendarDialog(false);
                    setCalendarToEdit(null);
                } }
                onCalendarSaved={(updateCalendars) => {
                    setCalendars(calendars.map(existingCalendar => existingCalendar._id === updateCalendars._id ? updateCalendars : existingCalendar));
                    setCalendarToEdit(null);
                } } selectedDate={null}
                />
            }
        </>
    );
}

export default ViewCalendarStaffLoggedIn;