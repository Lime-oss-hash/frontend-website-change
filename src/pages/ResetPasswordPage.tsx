import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { UserChangePasswordCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import styles from "../styles/navbar.module.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import TextInputField from "../components/form/TextInputField";

interface ResetPasswordProps {
    onPasswordSubmitted: (user: User) => void,
}

const ResetPassword = ({ onPasswordSubmitted }: ResetPasswordProps) => {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserChangePasswordCredentials>();

    async function onSubmit(input: UserChangePasswordCredentials) {
        try {
            const passwordResponse = await WebsitesApi.userChangePassword(input);
            onPasswordSubmitted(passwordResponse);
            navigate('/ResetPasswordReceivedPage');
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <Container className={styles.dataPage}>
            <Card className={styles.dataPage}>
                <Card.Title className={styles.title}> <br />
                    <center><b>Reset Your Password</b></center>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
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
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.resetpassword}`}>
                                Submit
                        </Button> <br />
                    </Form>
                </Card.Body>
            </Card> <br />
        </Container>
    );
}

export default ResetPassword;