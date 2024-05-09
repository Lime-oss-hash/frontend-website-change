import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { UserLoginCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css"

interface UserLoginModalProps {
    onDismiss: () => void,
    onUserLoginSuccessful: (user: User) => void,
}

const UserLoginModal = ({ onDismiss, onUserLoginSuccessful }: UserLoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserLoginCredentials>();

    async function onSubmit(credentials: UserLoginCredentials) {
        try {
            const userLoggedIn = await WebsitesApi.userLogin(credentials);
            onUserLoginSuccessful(userLoggedIn);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
           console.error(error); 
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.title}>
                    Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalContents}>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button
                        variant="success"
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                            Login
                    </Button>
                </Form>
                <br />
                <div>
                    Forgot Password?<br/>
                    <Link to='/forgotpassword'>
                        <Button className={`${styleUtils.width100} ${styles.forgotpassword}`}>
                            Reset Password
                        </Button>
                    </Link>
                </div>
            </Modal.Body>
        </Modal>
    );
}
 
export default UserLoginModal;