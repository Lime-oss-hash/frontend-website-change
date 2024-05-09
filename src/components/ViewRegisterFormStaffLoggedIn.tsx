import { useEffect, useState } from "react";
import { Registers as RegisterModel } from "../models/registers";
import * as WebsitesApi from "../network/websites_api";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Register from '../components/Register';
import styles from "../styles/RegisterPage.module.css";

const ViewRegisterFormStaffLoggedIn = () => {

    const [registers, setRegisters] = useState<RegisterModel[]>([]);
    const [registerLoading, setRegisterLoading] = useState(true);
    const [showRegisterLoadingError, setShowRegisterLoadingError] = useState(false);

    useEffect(() => {
        async function loadRegisters() {
            try {
                setShowRegisterLoadingError(false);
                setRegisterLoading(true);
                const registers = await WebsitesApi.fetchRegisters();
                setRegisters(registers);
            } catch (error) {
                console.error(error);
                setShowRegisterLoadingError(true);
            } finally {
                setRegisterLoading(false);
            }
        }
        loadRegisters();
    }, []);

    async function deleteRegister(register: RegisterModel) {
        try {
            await WebsitesApi.deleteRegisterWithEmail(register._id);
            setRegisters(registers.filter(existingRegister => existingRegister._id !== register._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const registersGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.registersGrid}`}>
            {registers.map(register => (
                <Col key={register._id}>
                    <Register
                        registerForm={register}
                        className={styles.display}
                        onDeleteRegisterClicked={deleteRegister}
                    />
                </Col>
            ))}
        </Row>

    return ( 
        <Container className={styles.dataPage}>
            {registerLoading && <Spinner animation='border' variant='success'/>}
            {showRegisterLoadingError && <p>Something went wrong, please refresh the page.</p>}
            {!registerLoading && !showRegisterLoadingError &&
            <>
            { 
                registers.length > 0
                ? registersGrid
                : <p>There are currently no registers pending.</p>
            }
            </>
            }
        </Container>
    );
}
 
export default ViewRegisterFormStaffLoggedIn;