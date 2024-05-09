import { useForm } from "react-hook-form";
import { Rosters } from "../models/rosters";
import { RosterDetail } from "../network/websites_api";
import { useEffect, useState } from "react";
import * as WebsitesApi from "../network/websites_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/RosterPage.module.css";

interface AddEditRosterDialogProps {
    rosterToEdit?: Rosters,
    onDismiss: () => void,
    onRosterSaved: (roster: Rosters) => void,
}

const AddEditRosterDialog = ({ rosterToEdit, onDismiss, onRosterSaved }: AddEditRosterDialogProps) => {
    
    const [time, setTime] = useState<string[]>([]);
    const [newTime, setNewTime] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [status, setStatus] = useState<string[]>([]);

    const { register, handleSubmit, formState : { errors, isSubmitting }, setValue } = useForm<RosterDetail>();
        useEffect(() => {
            if (rosterToEdit) {
                const { date, driverName, vehiclePlate, startTime, finishTime } = rosterToEdit;
                setValue("date", date);
                setValue("driverName", driverName);
                setValue("vehiclePlate", vehiclePlate);
                setValue("startTime", startTime);
                setValue("finishTime", finishTime);
                setValue("availabilityTime", time);
                setValue("availabilityStatus", status);
            }
        }, [rosterToEdit, time, status, setValue]);

        async function onSubmit(detail: RosterDetail) {
            try {
              let rosterResponse: Rosters;  
              if (rosterToEdit) {
                rosterResponse = await WebsitesApi.updateRoasters(rosterToEdit._id, detail);
              } else {
                rosterResponse = await WebsitesApi.createRosters(detail);
              }
              onRosterSaved(rosterResponse);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
    
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {rosterToEdit ? "Edit Roster" : "Add Roster"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.rosterPage}>
                <Form id="addEditRosterForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="date"
                        label="Date"
                        type="date"
                        placeholder="Date"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.date}
                    />

                    <TextInputField 
                        name="driverName"
                        label="Driver's Name"
                        type="text"
                        placeholder="Driver's Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.driverName}
                    />

                    <TextInputField 
                        name="vehiclePlate"
                        label="Vehicle Plate"
                        type="text"
                        placeholder="Vehicle Plate"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.vehiclePlate}
                    />

                    <TextInputField
                        name="startTime"
                        label="Roster starts from 09:00"
                        type="time"
                        placeholder="09:00"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.startTime}
                    />

                    <TextInputField 
                        name="finishTime"
                        label="Roster finishs by 14:30"
                        type="time"
                        placeholder="14:30"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.finishTime}
                    />

                    <Form.Label>
                        <b>Roster</b>
                    </Form.Label>
                    <ol>
                        {time.map((time) =>
                        <li key={time}>{time}</li>)}
                    </ol>
                    <Form.Group>
                        <ol>{status.map((status) =>
                        <li key={status}>{status}</li>)}
                        </ol>
                    </Form.Group>
                    
                    <Form.Group controlId="availabilityTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                        />
                    </Form.Group> <br />
                    <Form.Group controlId="availabilityStatus">
                        <Form.Label>Availability</Form.Label>
                        <Form.Select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}>
                                <option>Select availability type</option>
                                <option value={"Available"}>Available</option>
                                <option value={"Not-Available"}>Not-Available</option>
                                <option value={"Picking-Up"}>Picking-Up</option>
                                <option value={"Driving"}>Driving</option>
                                <option value={"Dropping-Off"}>Dropping-Off</option>
                        </Form.Select>
                    </Form.Group> <br />
                    
                    <Button
                        className={styles.button}
                        onClick={() => {
                            setTime([...time, newTime]);
                            setStatus([...status, newStatus]);
                        }}>
                            <FaPlus/>
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className={styles.button}
                    type="submit"
                    form="addEditRosterForm"
                    disabled={isSubmitting}
                    >
                        Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddEditRosterDialog;