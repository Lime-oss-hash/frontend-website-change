import { Button, Navbar } from "react-bootstrap";
import { Staff } from "../models/staff";
import * as WebsitesApi from "../network/websites_api";
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";

interface StaffLoginViewProps {
    staff: Staff,
    onStaffLogoutSuccessful: () => void,
}

const StaffLoggedInView = ({ staff, onStaffLogoutSuccessful }: StaffLoginViewProps) => {
    
    async function StaffLogout() {
        try {
            await WebsitesApi.staffLogout();
            onStaffLogoutSuccessful();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return ( 
        <div>
            <Link to='/viewregisters'>
                <Button className={styles.button2}>
                    View Registration Form
                </Button>
            </Link>
            <Link to='/bookings/staffview'>
                <Button className={styles.button3}>
                    View Booking Requests
                </Button>
            </Link>
            <Link to='/viewrosters'>
                <Button className={styles.button4}>
                    View Driver's Rosters
                </Button>
            </Link>
            <Link to='/viewcalendar'>
                <Button className={styles.calendar}>
                    Calendar
                </Button>
            </Link>
            <div className={styles.container}>
                <div className={styles.information}>
                    <Navbar.Text className="me-2">
                        Signed in as: {staff.email}
                    </Navbar.Text>
                </div>
                <Button className={styles.button5} onClick={StaffLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}
 
export default StaffLoggedInView;