import { Button, Card } from "react-bootstrap";
import { Bookings as BookingModel } from "../models/bookings";
import styles from "../styles/BookingPage.module.css";
import { formatDate } from "../utils/formatDate";;

interface BookingProps {
    bookingForm: BookingModel,
    onDeleteBookingClicked: (booking: BookingModel) => void,
    className?: string,
}

const Booking = ({ bookingForm, onDeleteBookingClicked, className }: BookingProps) => {

    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        pickup,
        destination,
        wheelchair,
        passenger,
        purpose,
        trip,
        date,
        pickupTime,
        dropoffTime,
        additionalNotes,
        createdAt  
    } = bookingForm;

    return ( 
        <>
            <br/>

            <Card className={styles.cardBody}>
                <Card.Body>
                    <Card.Text>
                        <Card.Title>
                            <center><b>Booking Request Form</b></center>
                        </Card.Title>
                        Passenger's Name: {firstName} {lastName} <br />
                        Phone Number: {phoneNumber} <br />
                        Email Address: {email} <br />
                        Pick Up Address: {pickup} <br />
                        Destination Address: {destination} <br />
                        Wheelchair Owning: {wheelchair} <br />
                        Number of Passengers: {passenger} <br />
                        Purpose of Trip: {purpose} <br />
                        Alternative Number of Trips: {trip} <br />
                        Booking Date: {date} <br />
                        Pick-Up Time: {pickupTime} <br />
                        Drop-Off Time: {dropoffTime} <br />
                        Additional Notes for Driver: {additionalNotes} <br />
                        <br />
                        <center>
                        <Button
                            onClick={() => {
                                onDeleteBookingClicked(bookingForm);
                            } }
                            variant="success">
                            Cancel Booking Request
                        </Button>
                        </center>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Booking Request Submitted: {formatDate(createdAt)}
                </Card.Footer>
            </Card><br />
            
        </>
    );
}
 
export default Booking;