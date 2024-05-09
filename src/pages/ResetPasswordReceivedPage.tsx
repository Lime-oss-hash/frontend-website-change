import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const ResetPasswordReceivedPage = () => {
    return (
        <><div>
            <p>
                Now you can sign in with your new password.
            </p>
            <Link to='/'>
                <Button className={styles.button}>
                    Return Home
                </Button>
            </Link>
        </div><br /></>
    );
}

export default ResetPasswordReceivedPage;