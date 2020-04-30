import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export default class ClassesTable extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.selectSub = this.props.selectSub;
        this.clickSubj = this.props.clickSubj;
    }

    handleClick(id) {
        this.clickSubj(id);
    }

    handleSelection(event, id) {
        if (id.isSelected) {
            delete id.isSelected;
        } else {
            id.isSelected = true;
        }

        // console.log(event.target.checked, id);
        this.selectSub(event.target.checked, id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.classes !== this.props.classes) {
            console.log("update");
            // console.log(this.props.classes);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Subject - Course</th>

                        <th>Credits</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classe) => (
                        <tr key={classe._id} onClick={() => this.handleClick(classe)}>
                            <td>
                                {console.log(classe.isSelected)}
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox"
                                    aria-label={classe.Title}
                                    onChange={(event) =>
                                        this.handleSelection(event, classe)
                                    }
                                    checked={classe.isSelected ? true : false}
                                />
                            </td>
                            <td>
                                {classe.Subj}
                                {classe.Crse}
                            </td>

                            <td>{classe.Cred}</td>
                            <td>{classe.Title}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
