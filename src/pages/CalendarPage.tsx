import { useEffect, useState } from "react";
import { Staff } from "../models/staff";
import * as WebsitesApi from "../network/websites_api";
import { Container } from "react-bootstrap";
import styles from "../styles/CalendarPage.module.css";
import CalendarPageLoggedInView from "../components/CalendarPageLoggedInView";
import { Calendars } from "../models/calendars";

function CalendarPage() {

    const [loggedInStaff, setLoggedInStaff] = useState<Staff|null>(null);

    useEffect(() => {
        async function fetchLoggedInStaff() {
            try {
                const staff = await WebsitesApi.getLoggedInStaff();
                setLoggedInStaff(staff);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInStaff();
    }, []);

    return (
        <div>
            <Container className={styles.Datapages}>
                {loggedInStaff
                ? <CalendarPageLoggedInView onCalendarSaved={function (calendar: Calendars): void{}} />
                : null
                }
            </Container>
        </div>
    );
}

export default CalendarPage;