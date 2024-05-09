import { Component } from "react";
import { Col, Row } from "react-bootstrap";

interface HeaderState {
    currentDate: Date,
    monthNames: string[],
    dayNames: string[],
    year: number | undefined;
    month: number | undefined;
    date: number | undefined;
    day: number | undefined;
    monthSpelled: string | undefined;
    daySpelled: string | undefined;
}

class Header extends Component<{}, HeaderState> {
    constructor(props: {}) {
        super(props);
        const MonthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "OCtober", "November", "December"
        ];
        const dayNames = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        this.state = {
            currentDate: new Date(),
            monthNames: MonthNames,
            dayNames: dayNames,
            year: undefined,
            month: undefined,
            date: undefined,
            day: undefined,
            monthSpelled: undefined,
            daySpelled: undefined,
        };
    }

    componentDidMount() {
        const currentDate = this.state.currentDate;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const day = currentDate.getDay();
        const monthSpelled = this.state.monthNames[month];
        const daySpelled = this.state.dayNames[day];

        this.setState({
            currentDate: currentDate,
            year: year,
            month: month,
            date: date,
            day: day,
            monthSpelled: monthSpelled,
            daySpelled: daySpelled,
        });
    }

    render() {
        return (
            <div>
                <h1 className="Month-Year-Header">
                    {this.state.monthSpelled} {this.state.year}
                </h1>
                <div className="seven-cols">
                    <Row>
                        <Col lg={1} md={1} className="weekend-day">Sun</Col>
                        <Col lg={1} md={1}>Mon</Col>
                        <Col lg={1} md={1}>Tue</Col>
                        <Col lg={1} md={1}>Wed</Col>
                        <Col lg={1} md={1}>Thu</Col>
                        <Col lg={1} md={1}>Fri</Col>
                        <Col lg={1} md={1} className="weekend-day">Sat</Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Header;