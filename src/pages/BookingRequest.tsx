import { useEffect, useState } from "react";
import { User } from "../models/user";
import * as WebsitesApi from "../network/websites_api";
import { Container } from "react-bootstrap";
import styles from "../styles/BookingPage.module.css";
import ViewBookingPageUserLoggedInView from "../components/ViewBookingPageUserLoggedInView";
import ViewBookingPageLoggedOutView from "./ViewBookingPageLoggedOutView";

function BookingRequest() {
    const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await WebsitesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);

    return (
        <Container className={styles.dataPages}>
            {loggedInUser
            ? <ViewBookingPageUserLoggedInView />
            : <ViewBookingPageLoggedOutView />
            }
        </Container>
    );
}

export default BookingRequest;