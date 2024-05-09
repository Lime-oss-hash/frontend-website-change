import { Button } from "react-bootstrap";
import styles from "../styles/footer.module.css";

interface FooterLoggedOutViewProps {
    onStaffLoginClicked: () => void,
}

const FooterLoggedOutView = ({onStaffLoginClicked}: FooterLoggedOutViewProps) => {
    return ( 
        <Button className={styles.button} onClick={onStaffLoginClicked}>Staff Log In</Button>
    );
}
 
export default FooterLoggedOutView;