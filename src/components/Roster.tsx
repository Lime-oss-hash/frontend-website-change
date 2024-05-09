import { Button, Card } from "react-bootstrap";
import { Rosters as RosterModel } from "../models/rosters";
import { formatDate, formatDateTime } from "../utils/formatDate";
import styles from "../styles/RosterPage.module.css";

interface RosterProps {
    roster: RosterModel,
    className?: string,
    onRosterClicked: (roster: RosterModel) => void,
    onDeleteRosterClicked: (roster: RosterModel) => void,
}

const Roster = ({ roster, className, onRosterClicked, onDeleteRosterClicked }: RosterProps) => {
    
    const {
        date,
        driverName,
        vehiclePlate,
        startTime,
        finishTime,
        availabilityTime,
        availabilityStatus,
        createdAt,
        updatedAt,
    } = roster;

    let createdUpdatedRoster: string;
    if (updatedAt > createdAt) {
        createdUpdatedRoster = "Roster Updated: " + formatDateTime(updatedAt);
    } else {
        createdUpdatedRoster = "Roster Created: " + formatDateTime(createdAt);
    }

    return ( 
        <><Card className={`${styles.cards}`} onClick={() => onRosterClicked(roster)}>
            <Card.Title className={styles.Title}>
                <center><b>Roster</b></center> <br />
                <center><b>{formatDate(date)}</b></center> <br />
                <center>*Click Roster to update*</center> <br />
            </Card.Title>
            <Card.Body>
                Date: {date} <br />
                Driver's Name: {driverName}<br />
                Vehicle Plate: {vehiclePlate}<br />
                Start Time: {startTime}<br />
                Finish Time: {finishTime}<br />
                Roster Schedule: {availabilityTime}<br />
                <div className={styles.time}>
                    Time: {availabilityStatus}
                    <ol>
                        {availabilityTime.map((inputTime) => <li key={inputTime}>{inputTime}</li>)}
                    </ol>
                    Availability:
                    <ol>
                        {availabilityStatus.map((inputStatus) => <li key={inputStatus}>{inputStatus}</li>)}
                    </ol>
                </div>
                <center>
                    <Button
                        onClick={() => {
                            onDeleteRosterClicked(roster);
                        } }
                        variant="success">
                            Cancel Roster
                    </Button>
                </center>
            </Card.Body>
            <Card.Footer>
                {createdUpdatedRoster}
            </Card.Footer>
        </Card><br /></>
    );
}
 
export default Roster;