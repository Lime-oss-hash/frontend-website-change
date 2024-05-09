import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from '../models/user'
import { Link } from "react-router-dom";
import UserLoggedInView from "./UserLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import styles from "../styles/navbar.module.css";

interface NavBarProps {
  loggedInUser: User | null,
  onUserSignUpClicked: () => void,
  onUserLoginClicked: () => void,
  onUserLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onUserSignUpClicked, onUserLoginClicked, onUserLogoutSuccessful }: NavBarProps) => {
  return (
    <Navbar bg="success" variant="dark" expand="sm" sticky="top"> {}
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.title}>
          Waka Eastern Bay Transport Community
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            { loggedInUser
            ? <UserLoggedInView user={loggedInUser} onUserLogoutSuccessful={onUserLogoutSuccessful} />
            : <NavBarLoggedOutView onUserLoginClicked={onUserLoginClicked} onUserSignUpClicked={onUserSignUpClicked} />
            }
          </Nav>
        </Navbar.Collapse>
      </Container>  
    </Navbar>
  );
}

export default NavBar;
