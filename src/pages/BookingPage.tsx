import { useEffect, useState } from "react";
import { User } from "../models/user";
import { Staff } from "../models/staff";
import * as WebsitesApi from "../network/websites_api";
import { Container } from "react-bootstrap";
import styles from "../styles/utils.module.css";
import { Bookings } from "../models/bookings";
import NotFoundPage from "./NotFoundPage";
import BookingPageLoggedInView from "../components/BookingLoggedInView";

function BookingPage() {

    const [loggedInUser, setLoggedInUser] = useState<User|null>(null);
    const [loggedInStaff, setLoggedInStaff] = useState<Staff|null>(null);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await WebsitesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchLoggedInStaff() {
            try {
                const staff = await WebsitesApi.getLoggedInStaff();
                setLoggedInStaff(staff);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
        fetchLoggedInStaff();
    }, []);

    return (
        <div>
            <Container className={styles.Datapages}>
                {loggedInUser
                ? <BookingPageLoggedInView onBookingSaved={function (booking: Bookings): void{}} />
                : <NotFoundPage/>
                }
            </Container>
            <Container className={styles.Datapages}>
                {loggedInStaff
                ? <BookingPageLoggedInView onBookingSaved={function (booking: Bookings): void{}} />
                : null
                }
            </Container>
        </div>
    );
}

export default BookingPage;