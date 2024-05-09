import { useState } from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { SignUpUserCredentials } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import { ConflictError } from "../errors/http_errors";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface UserSignUpModalProps {
    onDismiss: () => void,
    onUserSignUpSuccessful: (user: User) => void,
}

const UserSignUpModal = ({onDismiss, onUserSignUpSuccessful}: UserSignUpModalProps) => {
    
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpUserCredentials>();

    async function onSubmit(credentials: SignUpUserCredentials) {
        try {
            const newUser = await WebsitesApi.SignUpUser(credentials);
            onUserSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            alert(error);
            console.error(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
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
                        registerOptions={{ required: "Required" }}
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
                    <TextInputField
                        name="firstName"
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.firstName}
                    />
                    <TextInputField
                        name="lastName"
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.lastName}
                    />
                    <TextInputField
                        name="dob"
                        label="Date of Birth"
                        type="date"
                        placeholder="Date of Birth"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.dob}
                        />
                    <TextInputField
                        name="address"
                        label="Address"
                        type="text"
                        placeholder="Address"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.address}
                    />
                    <TextInputField
                        name="town"
                        label="Town"
                        type="text"
                        placeholder="Town"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.town}
                    />
                    <TextInputField
                        name="postcode"
                        label="Postcode"
                        type="text"
                        placeholder="Postcode"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.postcode}
                    />
                    <TextInputField
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="Email Address"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                    <TextInputField
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        placeholder="Phone Number"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.phoneNumber}
                    />
                    <TextInputField
                        name="altPhoneNumber"
                        label="Alterative Phone Number"
                        type="tel"
                        placeholder="Alternative Phone Number"
                        register={register}
                        error={errors.altPhoneNumber}
                    />
                    <TextInputField
                        name="gender"
                        label="Gender"
                        type="text"
                        placeholder="Gender"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.gender}
                    />
                    <TextInputField
                        name="ethnicity"
                        label="Ethnicity"
                        type="text"
                        placeholder="Ethnicity"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.ethnicity}
                    />
                    <TextInputField
                        name="disability"
                        label="Disability"
                        type="text"
                        placeholder="Disability"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.disability}
                    />
                    <TextInputField
                        name="disabilityDetails"
                        label="Disability Details"
                        type="text"
                        placeholder="Disability Details"
                        register={register}
                        error={errors.disabilityDetails}
                    />
                    <TextInputField
                        name="assistance"
                        label="Assistance"
                        type="text"
                        placeholder="Assistance"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.assistance}
                    />
                    <TextInputField
                        name="emergencyName"
                        label="Emergency Name"
                        type="text"
                        placeholder="Emergency Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.emergencyName}
                    />
                    <TextInputField
                        name="emergencyPhone"
                        label="Emergency Phone"
                        type="text"
                        placeholder="Emergency Phone"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.emergencyPhone}
                    />
                    <TextInputField
                        name="emergencyRelationship"
                        label="Emergency Relationship"
                        type="text"
                        placeholder="Emergency Relationship"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.emergencyRelationship}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                            Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
 
export default UserSignUpModal;