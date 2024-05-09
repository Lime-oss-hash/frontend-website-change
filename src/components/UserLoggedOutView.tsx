import { Button, Card, Container, Form } from "react-bootstrap";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { UserLoginCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import styles from "../styles/navbar.module.css";
import TextInputField from "./form/TextInputField";
import { Link } from "react-router-dom";
import styleUtils from "../styles/utils.module.css";

interface UserLoggedOutViewProps {
    onUserLoginSuccessful: (user: User) => void,
}

const UserLoggedOutView = ({ onUserLoginSuccessful }: UserLoggedOutViewProps) => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserLoginCredentials>();
    
    async function onSubmit(credentials: UserLoginCredentials) {
        try {
            const userLoggedIn = await WebsitesApi.userLogin(credentials);
            onUserLoginSuccessful(userLoggedIn);
            window.location.reload();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }
    return ( 
        <div>
            <Container className={styles.dataPage}>
                <Card className={`${styles.dataPage}`}>
                    <Card.Title><b>Login</b></Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <TextInputField
                                name="username"
                                label="Username"
                                type="text"
                                placeholder="Username"
                                register={register}
                                registerOptions={{ required: "Required" }}
                                error={errors.username}
                            />
                            <TextInputField
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                register={register}
                                registerOptions={{required: "Required"}}
                                error={errors.password}
                            />
                            <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.login}`}>
                                Login
                            </Button>
                        </Form>
                        <div className={styles.forgot}>
                            Forgot Password?<br/>
                            <Link to='/forgotpassword'>
                                <Button 
                                    className={`${styleUtils.width100}` }>
                                        Forgot Password
                                </Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
 
export default UserLoggedOutView;