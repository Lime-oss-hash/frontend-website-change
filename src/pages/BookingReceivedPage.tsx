import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/BookingPage.module.css";

function BookingReceivedPage() {
    return (
        <>
            <div>
                <p>
                    Your Booking request has been received.
                </p>
                <Link to='/'>
                    <Button className={styles.button}>
                        Return Home
                    </Button>
                </Link>
            </div><br /><br />
        </>
    );
}

export default BookingReceivedPage;