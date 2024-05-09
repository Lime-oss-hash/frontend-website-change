import { Button } from "react-bootstrap";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

const ForgotPasswordReceivedPage = () => {
    return (
        <><div>
            <p>
                We will contact you as soon as we received your password reset request.
            </p>
            <Link to='/'>
                <Button className={styles.button}>
                    Return Home
                </Button>
            </Link>
        </div><br /></>
    );
}

export default ForgotPasswordReceivedPage;