import { useForm } from "react-hook-form";
import { Staff } from "../models/staff";
import { StaffLoginCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import { Modal, Form, Button } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import styles from "../styles/navbar.module.css"

interface StaffLoginModalProps {
    onDismiss: () => void,
    onStaffLoginSuccessful: (staff: Staff) => void,
}

const StaffLoginModal = ({onDismiss, onStaffLoginSuccessful}: StaffLoginModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<StaffLoginCredentials>();
    
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
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.title}>
                    Staff Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalContents}>
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
                        variant="success"
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Staff Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
 
export default StaffLoginModal;