import { useNavigate } from "react-router-dom";
import { Registers as RegisterModel } from "../models/registers";
import { useForm } from "react-hook-form";
import { SignUpUserCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import { Button, Card, Form } from "react-bootstrap";
import RegisterPage from "../styles/RegisterPage.module.css";
import { formatDate } from "../utils/formatDate";
import styles from "../styles/RegisterPage.module.css";

interface RegisterProps {
    registerForm: RegisterModel,
    onDeleteRegisterClicked: (register: RegisterModel) => void,
    className?: string,
}

const Register = ({ registerForm, onDeleteRegisterClicked, className }: RegisterProps) => {
    
    const navigate = useNavigate();
    const formId = `newUserForm_${registerForm._id}`;
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpUserCredentials>();

    const {
        username,
        password,
        firstName,
        lastName,
        dob,
        email,
        address,
        town,
        postcode,
        phoneNumber,
        altPhoneNumber,
        gender,
        ethnicity,
        disability,
        disabilityDetails,
        assistance,
        emergencyName,
        emergencyPhone,
        emergencyRelationship,
        createdAt,
    } = registerForm;

    async function onSubmit(input: SignUpUserCredentials) {
        try {
            await WebsitesApi.SignUpUser(input);
            await WebsitesApi.deleteRegisterWithoutEmail(registerForm._id);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    
    return ( 
        <>
            <br />
            <Card className={`${RegisterPage.cardBody} ${className}`}>
                <Card.Body className={styles.register}>
                    <Card.Text>
                        <Card.Title className={RegisterPage.mainTitle}>
                            <center><b>Registration Form</b></center>
                        </Card.Title>

                        Username: {username} <br />
                        Password: {password} <br />
                        Name: {firstName}, {lastName} <br />
                        Date of Birth: {dob} <br />
                        Address: {address}, {town}, {postcode} <br />
                        Email Address: {email} <br />
                        Phone Number: {phoneNumber} <br />
                        Additional Phone Number: {altPhoneNumber} <br />
                        Gender: {gender} <br />
                        Ethnicity: {ethnicity} <br />
                        Disability: {disability} <br />
                        Disability Details: {disabilityDetails} <br />
                        Assitance: {assistance} <br /> <br />

                        <Card.Title>
                            <center><b>Emergency Contact Details</b></center>
                        </Card.Title>

                        Emergency Name: {emergencyName} <br />
                        Emergency Phone: {emergencyPhone} <br />
                        Emergency Relationship: {emergencyRelationship} <br />

                        <Form id={formId} onSubmit={handleSubmit(onSubmit)} hidden>
                            <Form.Control
                                type="text"
                                defaultValue={username}
                                {...register("username")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={password}
                                {...register("password")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={firstName}
                                {...register("firstName")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={lastName}
                                {...register("lastName")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={dob}
                                {...register("dob")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={address}
                                {...register("address")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={town}
                                {...register("town")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={postcode}
                                {...register("postcode")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={email}
                                {...register("email")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={phoneNumber}
                                {...register("phoneNumber")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={altPhoneNumber}
                                {...register("altPhoneNumber")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={gender}
                                {...register("gender")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={ethnicity}
                                {...register("ethnicity")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={disability}
                                {...register("disability")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={disabilityDetails}
                                {...register("disabilityDetails")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={assistance}
                                {...register("assistance")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={emergencyName}
                                {...register("emergencyName")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={emergencyPhone}
                                {...register("emergencyPhone")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={emergencyRelationship}
                                {...register("emergencyRelationship")}
                            />
                        </Form>
                        <br />
                        <center>
                            <Button
                                type="submit"
                                form={formId}
                                disabled={isSubmitting}
                                variant="success"
                                style={{ marginRight: "20px" }}>
                                    Approved
                            </Button>
                            <Button
                                onClick={() => {
                                    onDeleteRegisterClicked(registerForm);
                                }}
                                variant="danger">
                                    Rejected
                            </Button>
                        </center>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Registeration Submitted: {formatDate(createdAt)}
                </Card.Footer>
            </Card> <br /> <br />
        </>
    );
}
 
export default Register;