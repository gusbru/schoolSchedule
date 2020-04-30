import React from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

class CourseInformation extends React.Component {
    render() {
        const { currentSelected } = this.props;

        return (
            <div>
                <h2>Information</h2>
                {currentSelected ? (
                    <div>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>CRN</td>
                                    <td>{currentSelected.CRN}</td>
                                </tr>
                                <tr>
                                    <td>Subject</td>
                                    <td>{currentSelected.Subj}</td>
                                </tr>
                                <tr>
                                    <td>Course</td>
                                    <td>{currentSelected.Crse}</td>
                                </tr>
                                <tr>
                                    <td>Section</td>
                                    <td>{currentSelected.Sec}</td>
                                </tr>
                                <tr>
                                    <td>Credits</td>
                                    <td>{currentSelected.Cred}</td>
                                </tr>
                                <tr>
                                    <td>Title</td>
                                    <td>{currentSelected.Title}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <h3>Schedule</h3>

                        <CardDeck style={{ display: "flex", flexWrap: "wrap" }}>
                            {currentSelected.Classes.map(item => (
                                <Card
                                    key={item._id}
                                    style={{
                                        flex: "1 1 auto",
                                        width: "200px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>{item.type}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {item.instr}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            {item.days}
                                            {item.hours}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">
                                            Room: {item.room}
                                        </small>
                                    </Card.Footer>
                                </Card>
                            ))}
                        </CardDeck>
                    </div>
                ) : (
                    <div>
                        <p>Select a course</p>
                    </div>
                )}
            </div>
        );
    }
}

export default CourseInformation;
