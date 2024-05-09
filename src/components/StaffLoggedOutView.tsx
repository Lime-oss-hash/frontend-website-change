import { useForm } from "react-hook-form";
import { Staff } from "../models/staff";
import { StaffLoginCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import styles from "../styles/footer.module.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import TextInputField from "./form/TextInputField";

interface StaffLoggedOutViewProps {
    onStaffLoginSuccessful: (staff: Staff) => void,
}

const StaffLoggedOutView = ({ onStaffLoginSuccessful }: StaffLoggedOutViewProps) => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<StaffLoginCredentials>();

    async function onSubmit(credentials: StaffLoginCredentials) {
        try {
            const staffLoggedIn = await WebsitesApi.staffLogin(credentials);
            onStaffLoginSuccessful(staffLoggedIn);
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
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Email"
                                register={register}
                                registerOptions={{ required: "Required" }}
                                error={errors.email}
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
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.login}`}>
                                Staff Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
 
export default StaffLoggedOutView;