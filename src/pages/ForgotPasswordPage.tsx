import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { UserForgotPassowrdCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import { Button, Card, Container, Form } from "react-bootstrap";
import styles from "../styles/navbar.module.css";
import TextInputField from "../components/form/TextInputField";

interface ForgotPasswordProps {
    onEmailSubmitted: (user: User) => void,
}

const ForgotPassword = ({ onEmailSubmitted }: ForgotPasswordProps) => {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserForgotPassowrdCredentials>();
    
    async function onSubmit(input: UserForgotPassowrdCredentials) {
        try {
            const emailResponse = await WebsitesApi.userForgotPassword(input);
            onEmailSubmitted(emailResponse);
            navigate('/ForgotPasswordReceivedPage');
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <Container className={styles.dataPage}>
            <Card className={styles.dataPage}>
            <Card.Title className={styles.title}> <br />
                    <center><b>Forgot Password?</b></center>
            </Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <TextInputField
                                    className="mb-3"
                                    name="text"
                                    label="First Name"
                                    type="text"
                                    placeholder="First Name"
                                    register={register}
                                    registerOptions={{ required: "Required" }}
                                    error={errors.firstName}
                                />
                            </div>    
                            <div className="col-md-6">
                                <TextInputField
                                    className="mb-3"
                                    name="text"
                                    label="Last Name"
                                    type="text"
                                    placeholder="Last Name"
                                    register={register}
                                    registerOptions={{ required: "Required" }}
                                    error={errors.lastName}
                                />
                            </div>
                        </div>

                        <TextInputField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="email@example.com"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.email}
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.forgotpassword}`}>
                                Submit
                        </Button> <br />
                    </Form> 
                </Card.Body>
            </Card> <br />
        </Container>
    );
}
 
export default ForgotPassword;