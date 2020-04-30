import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../../actions";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./SavedSchedules.css";

function SavedSchedules() {
    const user = useSelector(state => state.user);
    const { scheduleList, isLoading } = useSelector(state => state.schedules);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.token) dispatch(scheduleActions.getAllSchedules(user.token));
    }, [user]);

    if (isLoading) {
        return (
            <div className="saved-schedules-loading">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <Container>
            <h2>Saved Schedules</h2>
            {scheduleList.length !== 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Subjects</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleList.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.selectedSub.length}</td>
                                <td>X</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div className="saved-schedules-empty">No saved Calendars :(</div>
            )}
        </Container>
    );
}

export default SavedSchedules;
