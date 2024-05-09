import { useNavigate } from "react-router-dom";
import { Registers } from "../models/registers";
import { useForm } from "react-hook-form";
import { RegisterDetail } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import styles from "../styles/RegisterPage.module.css";
import { Button, Card, Form } from "react-bootstrap";

interface RegisterPageProps {
    onRegisterSaved: (registers: Registers) => void,
}

const RegisterPage = ({ onRegisterSaved }: RegisterPageProps) => {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<RegisterDetail>();

    async function onSubmit(input: RegisterDetail) {
        try {
            const registerResponse = await WebsitesApi.createRegister(input);
            onRegisterSaved(registerResponse);
            navigate('/RegisterReceivedPage');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return ( 
        <div className={styles.registerPageContents}>
            <Card className={styles.card}>
                <Card.Title className={styles.title}> <br />
                    <center><b>Registeration Form</b></center>
                </Card.Title> <br />
                <Card.Title className={styles.title2}>
                    <center><b>Personal Details</b></center>
                </Card.Title> <br />
                
                <Form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
                    
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    isInvalid={!!errors.username}
                                    {...register("username", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username?.message}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    isInvalid={!!errors.password}
                                    {...register("password", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </div> <br />

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        isInvalid={!!errors.firstName}
                                        {...register("firstName", { required: "Required" })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName?.message}
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        isInvalid={!!errors.lastName}
                                        {...register("lastName", { required: "Required" })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName?.message}
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </div> 
                    </div> <br />

                    <div className="row">
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="dob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    isInvalid={!!errors.dob}
                                    {...register("dob", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dob?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    aria-label="gender"
                                    placeholder="Please select one option"
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Required" })}>

                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Prefer not to answer">Prefer not to answer</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.gender?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="ethnicity">
                                <Form.Label>Ethnicity</Form.Label>
                                <Form.Select
                                    aria-label="ethnicity"
                                    placeholder="Please select one option"
                                    isInvalid={!!errors.ethnicity}
                                    {...register("ethnicity", { required: "Required" })}>

                                <option value="Māori">Māori</option>
                                <option value="European">European</option>
                                <option value="Pacific">Pacific Peoples</option>
                                <option value="Asian">Asian</option>
                                <option value="Others">Other Ethnicity</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.ethnicity?.message}
                                </Form.Control.Feedback>
                            </Form.Group> <br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address"
                                    isInvalid={!!errors.address}
                                    {...register("address", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="town">
                                <Form.Label>Town</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Town"
                                    isInvalid={!!errors.town}
                                    {...register("town", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.town?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="postcode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Postcode"
                                    isInvalid={!!errors.postcode}
                                    {...register("postcode", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.postcode?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div> <br />

                    <Card.Title><center><b>Contact Details</b></center></Card.Title> <br />
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email@example.com"
                            isInvalid={!!errors.email}
                            {...register("email", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group> <br />

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Phone Number"
                                    isInvalid={!!errors.phoneNumber}
                                    {...register("phoneNumber", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="altPhoneNumber">
                                <Form.Label>Additional Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="<Optional Field>"
                                    isInvalid={!!errors.altPhoneNumber}
                                    {...register("altPhoneNumber")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.altPhoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group> <br />
                        </div>
                    </div>

                    <Card.Title><center><b>Health Condition Details</b></center></Card.Title> <br />
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="disability">
                                <Form.Label>Do you suffer from any disabilities?</Form.Label>
                                <div key="inline">
                                    <Form.Check
                                        inline
                                        type={"radio"}
                                        value={"Yes"}
                                        label={"Yes"}
                                        {...register("disability", { required: "Required" })}
                                    />
                                    <Form.Check
                                        inline
                                        type={"radio"}
                                        value={"No"}
                                        label={"No"}
                                        {...register("disability", { required: "Required" })}
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.disability?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="assistance">
                                <Form.Label>Are you with assistance person to support you?</Form.Label>
                                <div key="inline">
                                    <Form.Check
                                        inline
                                        type={"radio"}
                                        value={"Yes"}
                                        label={"Yes"}
                                        {...register("assistance", { required: "Required" })}
                                    />
                                    <Form.Check
                                        inline
                                        type={"radio"}
                                        value={"No"}
                                        label={"No"}
                                        {...register("assistance", { required: "Required" })}
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.assistance?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div> <br />

                    <Form.Group className="mb-3" controlId="disabilityDetails">
                        <Form.Label>If you select "Yes", please provide details of your disabilities briefly</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            {...register("disabilityDetails")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.disabilityDetails?.message}
                        </Form.Control.Feedback>
                    </Form.Group> <br />

                    <Card.Title><center><b>Emergency Contact Details</b></center></Card.Title> <br />
                    <div className="row">
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="emergencyName">
                                <Form.Label>Emergency Person's Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Emergency Person's Name"
                                    isInvalid={!!errors.emergencyName}
                                    {...register("emergencyName", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.emergencyName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="emergencyPhone">
                                <Form.Label>Emergency Person's Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Emergency Person's Phone Number"
                                    isInvalid={!!errors.emergencyPhone}
                                    {...register("emergencyPhone", { required: "Required" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.emergencyPhone?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="emergencyRelationship">
                                <Form.Label>Emergency Person's Relationship</Form.Label>
                                <Form.Select
                                    aria-label="emergencyRelationship"
                                    placeholder="Please select one option"
                                    isInvalid={!!errors.emergencyRelationship}
                                    {...register("emergencyRelationship", { required: "Required" })}>
                                    <option value="Son">Son</option>
                                    <option value="Daughter">Daughter</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Assistance">Personal Assistance</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.emergencyRelationship?.message}
                                </Form.Control.Feedback>
                            </Form.Group> <br />
                        </div>
                    </div>
                </Form>
                <center>
                    <Button
                        type="submit"
                        form="registerForm"
                        disabled={isSubmitting}
                        className={styles.submit_button}>
                            Submit
                    </Button>
                </center> <br />
            </Card>
            <br />
        </div>
    );
}
 
export default RegisterPage;