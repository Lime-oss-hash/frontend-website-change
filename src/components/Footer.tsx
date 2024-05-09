import { Container, Nav, Navbar } from "react-bootstrap";
import { Staff } from "../models/staff";
import FooterLoggedOutView from "./FooterLoggedOutView";
import StaffLoggedInView from "./StaffLoggedInView";
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";

interface FooterProps {
    loggedInStaff: Staff | null,
    onStaffLoginClicked: () => void,
    onStaffLogoutSuccessful: () => void,
}

const Footer = ({ loggedInStaff, onStaffLoginClicked, onStaffLogoutSuccessful }: FooterProps) => {
    return ( 
        <Navbar bg="success" variant="dark" expand="sm"> {}
            <Container>
                <Navbar.Brand as={Link} to="/" className={styles.title}>
                    Waka Eastern Bay Transport Community
                </Navbar.Brand>
                <Nav className="ms-auto">
                    { loggedInStaff
                    ? <StaffLoggedInView staff={loggedInStaff} onStaffLogoutSuccessful={onStaffLogoutSuccessful} />
                    : <FooterLoggedOutView onStaffLoginClicked={onStaffLoginClicked} />
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}
 
export default Footer;