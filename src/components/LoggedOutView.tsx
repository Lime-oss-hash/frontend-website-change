import location from "../styles/location.jpg";
import vision from "../styles/vision.png";
import purpose from "../styles/purpose.png";
import service from "../styles/service.png";
import supporting from "../styles/supporting.png";
import { Card, Col, Row } from "react-bootstrap";
import styles from "../styles/HomePage.module.css";

const cardDetails = [
    {
        imageSrc: vision,
        title: 'Our Vision',
    },
    {
        imageSrc: purpose,
        title: 'Our Purpose',
    },
    {
        imageSrc: service,
        title: 'Our Service',
    },
    {
        imageSrc: supporting,
        title: 'Our Support',
    },
];

const LoggedOutView = () => {
    return (
        <>
        <div className={styles.contents}>
            <div className="card mb-3 rounded">
                <img className={location} src={location} alt="Location" />
                <div className="card-body">
                    <h5 className="card-title">Our Location</h5>
                    <p className="card-text">VISIT US: Knox Presbyterian Church, 83A Domain Road, Whakatane</p>
                </div>
            </div>

            <Row xs={1} md={2} className="col g-4 rounded">
                {cardDetails.map((card, idx) => (
                    <Col key={idx}>
                        <Card style={{ width: "100%", height: "100%" }}>
                            <Card.Img variant="top" src={card.imageSrc}/>
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <br />
        </div>
        </>
    );
}

export default LoggedOutView;