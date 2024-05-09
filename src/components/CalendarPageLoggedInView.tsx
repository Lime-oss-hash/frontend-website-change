import { useNavigate } from "react-router-dom";
import { Calendars } from "../models/calendars";
import { CalendarDetail } from "../network/websites_api";
import { useForm } from "react-hook-form";
import * as WebsitesApi from "../network/websites_api";
import styles from "../styles/CalendarPage.module.css";
import { Card, Form } from "react-bootstrap";

interface CalendarPageLoggedInViewProps {
    onCalendarSaved: (calendars: Calendars) => void,
}

const CalendarPageLoggedInView = ({ onCalendarSaved, }: CalendarPageLoggedInViewProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CalendarDetail>();

    async function onSubmit(input: CalendarDetail) {
        try {
            const calendarResponse = await WebsitesApi.createCalendars(input);
            onCalendarSaved(calendarResponse);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div className={styles.calendarpageContents}>
            <Card className={`${styles.card}`}>
                <Card.Title className={styles.title}> <br />
                    <center><b>Waka Eastern Bay Community Transport's Calendar</b></center>
                </Card.Title> <br />
                <Form id='calendarForm' onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default CalendarPageLoggedInView;