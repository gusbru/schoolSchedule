import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Calendar from "../../components/Calendar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import history from "../../components/History";
import "./Calendars.css";

export default function Calendars() {
    const schedules = useSelector(state => state.schedules);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        console.log(schedules);
    }, [schedules]);

    const incrementIndex = () => {
        if (index < schedules.possibleSchedules.length - 1) {
            setIndex(index + 1);
        }
    };

    const decrementIndex = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    if (schedules.possibleSchedules.length === 0) {
        return (
            <Container>
                <h2>Calendars</h2>
                <Jumbotron className="calendars-container">
                    <p>No calendars to display</p>
                    <Button onClick={() => history.push("/search")}>Make a search</Button>
                </Jumbotron>
            </Container>
        );
    }

    return (
        <div>
            <h2>Calendars</h2>
            <Row className="pt-2 justify-content-md-center">
                <Col xs lg="1">
                    <Button onClick={decrementIndex}>-</Button>
                </Col>
                <Col xs lg="1">
                    {index + 1}/{schedules.possibleSchedules.length}
                </Col>
                <Col xs lg="1">
                    <Button onClick={incrementIndex}>+</Button>
                </Col>
            </Row>
            <Calendar
                selectedSub={schedules.selectedSubjects}
                removeSub={null}
                schedule={schedules.possibleSchedules[index]}
            />
        </div>
    );
}
