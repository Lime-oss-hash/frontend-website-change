import { useEffect, useState } from "react";
import { Rosters as RosterModel } from "../models/rosters";
import * as WebsitesApi from "../network/websites_api";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import styles from "../styles/RosterPage.module.css";
import Roster from "./Roster";
import { FaPlus } from "react-icons/fa";
import AddEditRosterDialog from "./AddEditRosterDialog";

const ViewRosterStaffLoggedIn = () => {
    
    const [rosters, setRosters] = useState<RosterModel[]>([]);
    const [rostersLoading, setRostersLoading] = useState(true);
    const [showRostersLoadingError, setShowRostersLoadingError] = useState(false);
    
    const [showAddRosterDialog, setShowAddRosterDialog] = useState(false);
    const [rosterToEdit, setRosterToEdit] = useState<RosterModel | null>(null);

    useEffect(() => {
        async function loadRosters() {
            try {
                setShowRostersLoadingError(false);
                setRostersLoading(true);
                const rosters = await WebsitesApi.fetchRosters();
                setRosters(rosters);
            } catch (error) {
                console.error(error);
                setShowRostersLoadingError(true);
            } finally {
                setRostersLoading(false);
            }
        }
        loadRosters();
    }, []);

    async function deleteRoster(roster: RosterModel) {
        try {
            await WebsitesApi.deleteRoster(roster._id);
            setRosters(rosters.filter(existingRoster => existingRoster._id !== roster._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const rostersGrid = 
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.rostersGrid}`}>
            {rosters.map(roster => (
                <Col key={roster._id}>
                    <Roster
                        roster={roster}
                        className={styles.roster}
                        onRosterClicked={setRosterToEdit}
                        onDeleteRosterClicked={deleteRoster}
                    />
                </Col>
            ))}
        </Row>

    return ( 
        <>
            <Button
                className={`mb-4 ${styles.button}`}
                onClick={() => setShowAddRosterDialog(true)}>
                <FaPlus />
                Add new roster
            </Button>
            {rostersLoading && <Spinner animation="border" variant="primary" />}
            {showRostersLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!rostersLoading && !showRostersLoadingError &&
                <>
                    {rosters.length > 0
                        ? rostersGrid
                        : <p>There are no current rosters yet</p>
                    }
                </>
            }
            {showAddRosterDialog &&
                <AddEditRosterDialog
                    onDismiss={() => setShowAddRosterDialog(false)}
                    onRosterSaved={(newRoster) => {
                        setRosters([...rosters, newRoster]);
                        setShowAddRosterDialog(false);
                    }}
                />
            }
            {rosterToEdit &&
                <AddEditRosterDialog
                    rosterToEdit={rosterToEdit}
                    onDismiss={() => setRosterToEdit(null)}
                    onRosterSaved={(updatedRoster) => {
                        setRosters(rosters.map(existingRoster => existingRoster._id === updatedRoster._id ? updatedRoster : existingRoster))
                        setRosterToEdit(null);
                    }}
                />
            }
        </>
    );
}
 
export default ViewRosterStaffLoggedIn;