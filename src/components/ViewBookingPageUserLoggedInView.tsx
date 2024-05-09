import { useEffect, useState } from "react";
import {Bookings as BookingModel} from "../models/bookings";
import * as WebsitesApi from "../network/websites_api";
import { Col, Row, Spinner } from "react-bootstrap";
import styles from "../styles/BookingPage.module.css";
import Booking from "./Booking";

const ViewBookingPageUserLoggedInView = () => {

    const [bookings, setBookings] = useState<BookingModel[]>([]);
    const [bookingLoading, setBookingLoading] = useState(true);
    const [showBookingLoadingError, setShowBookingLoadingError] = useState(false);

    useEffect(() => {
        async function loadBookings() {
            try {
                setShowBookingLoadingError(false);
                setBookingLoading(true);
                const bookings = await WebsitesApi.fetchBookings();
                setBookings(bookings);
            } catch (error) {
                console.error(error);
                setShowBookingLoadingError(true);
            } finally {
                setBookingLoading(false);
            }
        }
        loadBookings();
    }, []);

    async function deleteBooking(booking: BookingModel) {
        try {
            await WebsitesApi.deleteUserBooking(booking._id);
            setBookings(bookings.filter(existingBooking => existingBooking._id !== booking._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const bookingsGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.bookingsGrid}`}>
            {bookings.map(booking => (
                <Col key={booking._id}>
                    <Booking
                        bookingForm={booking}
                        className={styles.booking}
                        onDeleteBookingClicked={deleteBooking}
                    />
                </Col>
            ))}
        </Row>

    return ( 
        <>
            {bookingLoading && <Spinner animation='border' variant='primary' />}
            {showBookingLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!bookingLoading && !showBookingLoadingError &&
                <>
                    {bookings.length > 0
                        ? bookingsGrid
                        : <p>You haven't made any bookings yet</p>
                    }
                </>
            }
        </>
    );
}
 
export default ViewBookingPageUserLoggedInView;