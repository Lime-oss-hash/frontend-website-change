import { Button, Nav } from "react-bootstrap";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

interface NavBarLoggedOutViewProps {
    onUserSignUpClicked: () => void,
    onUserLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onUserSignUpClicked, onUserLoginClicked }: NavBarLoggedOutViewProps) => {
    return ( 
        <>
            <Nav>    
                <Nav.Link as={Link} to='/registerpage'>
                    <Button className={styles.button}>Sign Up</Button>
                </Nav.Link>
            </Nav>
            <Button className={styles.button} onClick={onUserLoginClicked}>Log In</Button>
        </>
     );
}
 
export default NavBarLoggedOutView;