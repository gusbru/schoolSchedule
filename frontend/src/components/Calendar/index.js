import React from "react";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "./Calendar.css";

const colors = ["primary", "secondary", "success", "danger", "warning", "info"];
const daysOfWeek = [
    "Time",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.findSelectedSubjId = this.findSelectedSubjId.bind(this);
    }

    findSelectedSubjId(subj) {
        const { selectedSub } = this.props;
        const index = selectedSub.findIndex(item => item.CRN === subj.CRN);

        return index >= 0 ? index : 0;
    }

    render() {
        const { selectedSub, schedule } = this.props;

        return (
            <div>
                <Container className="px-0">
                    <div>
                        <Badge variant="secondary">Subjects: {selectedSub.length}</Badge>
                        {selectedSub.map(item => (
                            <div
                                key={item._id}
                                style={{
                                    display: "inline-block",
                                    margin: "0 5px 0 0",
                                }}
                            >
                                <Badge
                                    variant={
                                        colors[
                                            this.findSelectedSubjId(item) % colors.length
                                        ]
                                    }
                                >
                                    {item.Subj}
                                    {item.Crse}
                                </Badge>
                            </div>
                        ))}
                    </div>
                    <Table bordered>
                        <thead>
                            <tr>
                                {daysOfWeek.map(item => (
                                    <th key={item}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((row, i) => (
                                <tr key={i}>
                                    <td>
                                        {(i + 8)
                                            .toString(10)
                                            .padStart(2, "0")
                                            .concat(":30")}
                                        <br></br>
                                        {(i + 9).toString(10).padStart(2, "0")}
                                        :20
                                    </td>
                                    {[0, 1, 2, 3, 4, 5].map(j => (
                                        <td key={j}>
                                            {schedule[i][j] && (
                                                <Badge
                                                    variant={
                                                        colors[
                                                            this.findSelectedSubjId(
                                                                schedule[i][j]
                                                            ) % colors.length
                                                        ]
                                                    }
                                                    style={{ marginTop: "3px" }}
                                                >
                                                    {schedule[i][j].CRN}
                                                    <br />
                                                    {schedule[i][j].Subj}
                                                    {schedule[i][j].Crse}
                                                    <br />
                                                    {schedule[i][j].Sec}
                                                </Badge>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Calendar;
