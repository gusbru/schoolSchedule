import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminActions } from "../../actions";
import ProgressBar from "react-bootstrap/ProgressBar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./Admin.css";
import List from "../List";
import LoadingSpinner from "../LoadingSpinner";

function Admin() {
    const dispatch = useDispatch();
    const adminState = useSelector(state => state.admin);
    const [file, setFile] = useState("");
    const [termname, setTermname] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const fileInputRef = useRef();

    const onChangeHandler = () => {
        setFile(fileInputRef.current.files[0]);
    };

    const onTermnameChange = event => {
        setTermname(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await dispatch(adminActions.addTerm(file, termname));

            console.log("file uploaded!!!!");
            setFile("");
            setMessage("File uploaded!");
            setStatus("alert alert-primary");
            // setDbList([...dbList, uploadedFile]);
        } catch (error) {
            console.log("error uploading the file");
            console.log(error);
            // setMessage(error.message);
            // setStatus("alert alert-danger");
        } finally {
            setTermname("");
            fileInputRef.current.value = "";
            setTimeout(() => {
                setMessage("");
                setStatus("");
                setFile("");
            }, 2000);
        }
    };

    const handleDelete = async filename => {
        try {
            console.log("filename = ", filename);

            // await removeFile(filename.Termname);
            dispatch(adminActions.deleteTerm(filename.Termname));

            // setDbList(dbList.filter(file => file.Termname !== filename.Termname));
        } catch (error) {
            console.log(error);
            setMessage(error.message);
            setStatus("alert alert-danger");
            setTimeout(() => {
                setMessage("");
                setStatus("");
            }, 2000);
        }
    };

    useEffect(() => {
        dispatch(adminActions.getTerms());
    }, []);

    return (
        <div className="container">
            <h2>Admin</h2>
            <Accordion className="accordion">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <h2>Add new Schedule</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-12">
                                    <form>
                                        {!file ? (
                                            <div className="form-group">
                                                <label
                                                    htmlFor="filetoupload"
                                                    className="customfileinput"
                                                >
                                                    Upload a New Schedule{" "}
                                                </label>
                                                <input
                                                    type="file"
                                                    accept=".html"
                                                    name="filetoupload"
                                                    id="filetoupload"
                                                    ref={fileInputRef}
                                                    onChange={onChangeHandler}
                                                />
                                                {status && (
                                                    <div className={status} role="alert">
                                                        {message}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <>
                                                <div className="row newScheduleRow">
                                                    <div className="col-12">
                                                        <List
                                                            dbList={[
                                                                {
                                                                    _id: 0,
                                                                    Termname: file.name,
                                                                },
                                                            ]}
                                                            handleClick={() =>
                                                                setFile("")
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row newScheduleRow">
                                                    <div className="col-3">
                                                        <label>Term name</label>
                                                    </div>
                                                    <div className="col-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="termname"
                                                            disabled={
                                                                adminState.upload
                                                                    .progress !== 0
                                                            }
                                                            value={termname}
                                                            onChange={onTermnameChange}
                                                        />
                                                    </div>
                                                    <div className="col-2">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            disabled={
                                                                adminState.upload
                                                                    .progress !== 0
                                                            }
                                                            onClick={handleSubmit}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {adminState.upload.progress !== 0 && (
                                            <div>
                                                <ProgressBar
                                                    animated
                                                    now={adminState.upload.progress}
                                                />
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        <h2>Current Calendars</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            {adminState.terms.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <List
                                    dbList={adminState.terms.termList}
                                    handleClick={handleDelete}
                                />
                            )}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

export default Admin;
