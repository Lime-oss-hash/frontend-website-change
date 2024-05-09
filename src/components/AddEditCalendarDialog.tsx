import { Calendars } from "../models/calendars";
import { useForm } from "react-hook-form";
import { CalendarDetail } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "../styles/CalendarPage.module.css";
import TextInputField from "./form/TextInputField";

interface AddEditCalendarDialogProps {
    calendarToEdit?: Calendars,
    selectedDate: Date | null;
    onDismiss: () => void,
    onCalendarSaved: (calendar: Calendars) => void,
}

const AddEditCalendarDialog = ({ calendarToEdit, selectedDate, onDismiss, onCalendarSaved }: AddEditCalendarDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CalendarDetail>({
        defaultValues: {
            date: calendarToEdit?.date || "",
            title: calendarToEdit?.title || "",
            description: calendarToEdit?.description || "",
            location: calendarToEdit?.location || "",
            startTime: calendarToEdit?.startTime || "",
            endTime: calendarToEdit?.endTime || "",
        }
    });

        async function onSubmit(detail: CalendarDetail) {
            try {
                if (selectedDate) {
                    detail.date = selectedDate.toISOString().split("T")[0];
                } else {
                    console.error("Selected date is not available");
                }

                let calendarResponse: Calendars;
                if (calendarToEdit) {
                    calendarResponse = await WebsitesApi.updateCalendars(calendarToEdit._id, detail);
                } else {
                    calendarResponse = await WebsitesApi.createCalendars(detail);
                }
                onCalendarSaved(calendarResponse);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.Title}>
                    {calendarToEdit? "Edit Event" : "Add Event"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Label className={styles.date}>
                    <b><center>Date: {selectedDate?.toDateString()}</center></b>
                </Form.Label>
            </Modal.Body>
            <Modal.Body className={styles.calendarPage}>
                <Form id="addEditCalendarForm" onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Calendar Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        as="textarea"
                        rows={4}
                        name="description"
                        label="Description"
                        placeholder="Calendar Description"
                        register={register}
                        error={errors.description}
                    />

                    <TextInputField
                        name="location"
                        label="Location"
                        type="text"
                        placeholder="Calendar Location"
                        register={register}
                        error={errors.location}
                    />

                    <TextInputField
                        name="startTime"
                        label="Start Time"
                        type="time"
                        placeholder="Calendar Start Time"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.startTime}
                    />

                    <TextInputField
                        name="endTime"
                        label="End Time"
                        type="time"
                        placeholder="Calendar End Time"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.endTime}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className={styles.button}
                    type="submit"
                    form="addEditCalendarForm"
                    disabled={isSubmitting}
                    >
                        Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddEditCalendarDialog;