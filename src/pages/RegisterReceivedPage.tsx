import { Link } from "react-router-dom";
import styles from "../styles/RegisterPage.module.css";
import { Button } from "react-bootstrap";

const RegisterReceivedPage = () => {
    return (
        <><div>
            <p>
                Thank you for your registeration submission. 
                We will contact you as soon as we received your registration.
            </p>
            <Link to='/'>
                <Button className={styles.button}>
                    Return Home
                </Button>
            </Link>
        </div><br /></>
    );
}

export default RegisterReceivedPage;