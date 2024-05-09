import { Button, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as WebsitesApi from "../network/websites_api";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

interface UserLoggedInViewProps {
    user: User,
    onUserLogoutSuccessful: () => void,
}

const UserLoggedInView = ({ user, onUserLogoutSuccessful }: UserLoggedInViewProps) => {
    
    async function userLogout() {
        try {
            await WebsitesApi.userLogout();
            onUserLogoutSuccessful();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return ( 
        <>
        <Nav>
            <Nav.Link as={Link} to='/bookings/userview'>
                <Button className={styles.button3}>
                    Check My Bookings
                </Button>
            </Nav.Link>
            <Nav.Link as={Link} to='/bookingpage'>
                <Button className={styles.button4}>
                    Make a Booking
                </Button>
            </Nav.Link>
        </Nav>
        <div className={styles.information}>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
        </div>
            <Button className={styles.button5} onClick={userLogout} >
                Logout
            </Button>
        </>
    );
}
 
export default UserLoggedInView;