import { useEffect, useState } from "react";
import { Staff } from "../models/staff";
import * as WebsitesApi from "../network/websites_api";
import { Container } from "react-bootstrap";
import styles from "../styles/RosterPage.module.css";
import ViewRosterStaffLoggedIn from "../components/ViewRosterStaffLoggedIn";
import ViewRosterPageLoggedOutView from "./ViewRosterPageLoggedOutView";

function ViewRoster() {
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
        <Container className={styles.dataPages}>
            {loggedInStaff
            ? <ViewRosterStaffLoggedIn />
            : <ViewRosterPageLoggedOutView />
            }
        </Container>
    );
}

export default ViewRoster;