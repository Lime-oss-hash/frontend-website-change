import { useEffect, useState } from "react";
import { User } from "../models/user";
import * as WebsitesApi from "../network/websites_api";
import { Container } from "react-bootstrap";
import styles from "../styles/utils.module.css";
import LoggedOutView from "../components/LoggedOutView";
import LoggedInView from "../components/LoggedInView";

function HomePage() {

    const [loggedInUser, setLoggedInUser] = useState<User|null>(null);
    
    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await WebsitesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);

    return (
        <div>
            <Container className={styles.Datapages}>
                {loggedInUser
                    ? <LoggedInView/>
                    : <LoggedOutView />
                }
            </Container>
        </div>
    );
}

export default HomePage;