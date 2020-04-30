import React from "react";
import { connect } from "react-redux";
import { classesActions, scheduleActions } from "../../actions";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ClassesTable from "../ClassesTable";
import Calendar from "../Calendar";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import SaveScheduleForm from "../SaveScheduleForm";
import { getSchedulesList, removeSchedule } from "../../api/Calendar";
import Badge from "react-bootstrap/Badge";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReactGA from "react-ga";
import history from "../../components/History";
import "./Search.css";

const trashIcon = <FontAwesomeIcon icon={faTrash} />;
const saveIcon = <FontAwesomeIcon icon={faSave} />;

// Global variable to store a JS object literal {_id:_id, name:name} with current
// selected user calendar in order to handle delete operations

let selectedSchedule = { name: "", _id: "" };
// let toastObj =[
//   {
//     header:"First",
//     body: "One message",
//     Show: true
//   }
//   ,
//   {
//     header:"Second",
//     body: "Second message",
//     Show: true
//   }

//   ]

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: "",
            searchResultSubj: [],
            currentSelected: "",
            currentScheduleNo: 0,
            isLoadingSubjectCourse: false,
            isLoadingGenerateSchedule: false,
            showModalSave: false,
            userSchedulesList: [],
            schedulesToDisplay: [],
            activeTab: "home",
            showModalDelete: false,
            showToast: true,
            toastObj: [],
        };

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.clear = this.clear.bind(this);
        this.selectSub = this.selectSub.bind(this);
        this.removeSub = this.removeSub.bind(this);
        this.handleCourseSearch = this.handleCourseSearch.bind(this);
        this.clickSubj = this.clickSubj.bind(this);
        this.handleGenerateSchedule = this.handleGenerateSchedule.bind(this);
        this.handleSelectTerm = this.handleSelectTerm.bind(this);
        this.handleModalSave = this.handleModalSave.bind(this);
        this.showSchedule = this.showSchedule.bind(this);
        this.addUserSchedule = this.addUserSchedule.bind(this);
        this.deleteUserSchedule = this.deleteUserSchedule.bind(this);
        this.setKey = this.setKey.bind(this);
        this.handleModalDelete = this.handleModalDelete.bind(this);
        this.handleDeleteSchedule = this.handleDeleteSchedule.bind(this);
        this.removeFromUserSchedule = this.removeFromUserSchedule.bind(this);
        this.setShowToast = this.setShowToast.bind(this);
        this.addToast = this.addToast.bind(this);
    }

    async handleSubjectChange(ev) {
        try {
            const subject = ev.target.value;

            // this.setState({
            //     subject,
            //     isLoadingSubjectCourse: true,
            //     searchResultSubj: [],
            //     course: "",
            // });

            // const res = await getSubjectCourse(subject, selectedTerm);
            await this.props.getSubjectCourse(
                subject,
                this.props.classes.terms.selectedTerm
            );

            // check for selected
            const { selectedSubjects } = this.props.schedules;
            const res = this.props.classes.classes.classesList;
            selectedSubjects.forEach(item => {
                const idx = res.findIndex(r => r._id === item._id);
                if (idx >= 0) {
                    res[idx].isSelected = true;
                }
            });
        } catch (error) {
            console.log(error);
            this.setState({
                isLoadingSubjectCourse: false,
            });
        }
    }

    handleModalSave() {
        const { showModalSave } = this.state;
        this.setState({
            showModalSave: !showModalSave,
        });
    }

    handleModalDelete() {
        const { showModalDelete } = this.state;
        this.setState({
            showModalDelete: !showModalDelete,
        });
    }

    handleCourseSearch(ev) {
        this.setState({
            course: ev.target.value,
        });

        // const res = this.props.classes.classes.classesList.filter(s =>
        //     s.Subj.toLowerCase()
        //         .concat(s.Crse.trim())
        //         .concat(s.Title.toLowerCase())
        //         .includes(ev.target.value.trim().toLowerCase())
        // );

        this.props.searchClass(ev.target.value);
    }

    clear() {
        this.setState({
            //     courseSearch: "",
            //     searchResultSubj: [],
            //     searchResultCourse: [],
            // selectedSub: [],
            //     currentSelected: "",
            //     currentScheduleNo: 0,
        });
        this.props.clearTerm();
        this.props.clearSelectedSubjects();

        this.setState({
            searchResultCourse: [],
            course: "",
        });
    }

    clickSubj(subj) {
        this.setState({
            currentSelected: subj,
        });
    }

    selectSub(checked, subj) {
        const selected = this.props.schedules.selectedSubjects;

        if (subj.isSelected) {
            if (!selected.find(s => s._id === subj._id)) {
                // console.log("call addSubject", subj);
                this.props.addSubject(subj);
            }
        } else {
            // remove from selecteds
            console.log("call removeSubject", subj);
            this.props.removeSubject(subj._id);
        }
    }

    removeSub(id) {
        this.props.removeSubject(id);
        this.props.updateListCheck(id);

        // const subj = this.state.searchResultSubj.find(s => s._id === id);

        // if (subj && subj.isSelected) delete subj.isSelected;

        this.setState({
            currentScheduleNo: 0,
        });
    }

    async handleGenerateSchedule() {
        try {
            // analytics
            ReactGA.event({
                category: "Generate Schedule",
                action: "Send",
            });

            // const { selectedSub } = this.state;
            const { selectedSubjects } = this.props.schedules;

            this.props.generateSchedule(selectedSubjects);

            // this.setState({
            //     isLoadingGenerateSchedule: true,
            // });

            // this.setState({
            //     currentScheduleNo: 0,
            //     isLoadingGenerateSchedule: false,
            // });
        } catch (error) {
            console.log(error);
            this.setState({
                isLoadingGenerateSchedule: false,
            });
        }
    }

    async handleSelectTerm(event) {
        try {
            const termname = event.target.value;

            this.props.setSelectedTerm(termname);
            // this.setState({
            //     term: termname,
            // });

            // loading subjects
            // this.setState({
            //     isLoadingSubjectByTerm: true,
            // });

            // const subjects = await getSubjectByTerm(termname);

            const subjectList = [];

            // subjects.forEach(s => {
            //     subjectList.push(s.Name);
            // });

            this.setState({
                subjectList,
            });
        } catch (error) {
            console.log(error);
            this.setState({
                isLoadingSubjectByTerm: false,
            });
        }
    }

    async componentDidMount() {
        if (this.props.schedules.possibleSchedules.length > 0) {
            return history.push("/calendars");
        }

        try {
            await this.props.getTermList();

            if (this.props.user.userInfo.email) {
                const storedSchedules = await getSchedulesList(this.props.user.token);

                const toastAlert = {
                    id: 0,
                    header: "Schedules saved",
                    body: `You have ${storedSchedules.length} stored schedules`,
                };

                // console.log("User stored schedules--->\n", storedSchedules, storedSchedules.length);

                const clonedToast = [...this.state.toastObj];
                clonedToast.push(toastAlert);
                this.setState({
                    userSchedulesList: storedSchedules,
                    toastObj: clonedToast,
                });
            }
        } catch (error) {
            console.log(
                "No registred schedules for the User--->",
                this.props.user.userInfo.email
            );
        }
    }

    handleClose(event) {
        this.setState({
            show: false,
        });
        // console.log('name-->\n', this.state.scheduleName,'email-->\n', this.props.emailUser,'\nSchedules to be stored-->\n', this.state.possibleSchedules[this.state.currentScheduleNo]);
    }

    handleShow(event) {
        this.setState({
            show: true,
        });
    }

    showSchedule(idx, ev) {
        // console.log("Schedule--->\n", this.state.userSchedulesList[idx], '\nname-->',this.state.userSchedulesList[idx].name, '\nschedulesToDisplay---->',this.state.schedulesToDisplay);

        const clonedSheduleToDisplay = [...this.state.schedulesToDisplay];
        const duplicate = this.state.schedulesToDisplay.find(
            s => s._id === this.state.userSchedulesList[idx]._id
        );
        // Prevents to add again a tab already present if user select a saved schedule twice
        if (!duplicate) {
            clonedSheduleToDisplay.push(this.state.userSchedulesList[idx]);
        }

        this.setState({
            schedulesToDisplay: clonedSheduleToDisplay,
            activeTab: this.state.userSchedulesList[idx].name,
        });
        selectedSchedule.name = this.state.userSchedulesList[idx].name;
        selectedSchedule._id = this.state.userSchedulesList[idx]._id;
        // console.log("Schedule to Display--->\n", clonedShowSchedule);
        // console.log("Content of selectedSchedule--->", selectedSchedule);
    }

    addUserSchedule(schedule) {
        const clonedShedule = [...this.state.userSchedulesList];
        clonedShedule.push(schedule);
        this.setState({
            userSchedulesList: clonedShedule,
        });
    }

    deleteUserSchedule(_id, name, ev) {
        // console.log("_id of schedule to be deleted--->", _id);
        selectedSchedule = { _id: _id, name: name };
        // console.log("selectedSchedule--->", selectedSchedule);
        this.handleModalDelete();
    }

    // tab control
    setKey(t, ev) {
        // console.log("key-->", t);
        this.setState({
            activeTab: t,
        });
    }

    async handleDeleteSchedule() {
        // console.log(
        //     "handleDeleteSchedule\nemail--->",
        //     this.props.user.userInfo.email,
        //     "\n_id--->",
        //     selectedSchedule._id
        // );
        await removeSchedule(this.props.user.userInfo.email, selectedSchedule._id);
        // Updating dropbox control
        const remainSchedules = this.state.userSchedulesList.filter(
            r => r._id !== selectedSchedule._id
        );

        const toastAlert = {
            id: selectedSchedule._id,
            header: "Successful deleted!",
            body: `The schedule ${selectedSchedule.name} was successful deleted!`,
        };

        const clonedToast = [...this.state.toastObj];
        clonedToast.push(toastAlert);

        const remainSchedulesToDisplay = this.state.schedulesToDisplay.filter(
            r => r._id !== selectedSchedule._id
        );
        this.setKey("home");

        this.setState({
            userSchedulesList: remainSchedules,
            schedulesToDisplay: remainSchedulesToDisplay,
            toastObj: clonedToast,
        });
        this.handleModalDelete();
    }

    removeFromUserSchedule(_id, ev) {
        // stoping click propagation of close button to onclick tab event which was tiggering setKey function twice
        ev.stopPropagation();
        // removing closed tabs
        const remainSchedules = this.state.schedulesToDisplay.filter(r => r._id !== _id);
        this.setKey("home");
        this.setState({
            schedulesToDisplay: remainSchedules,
        });
    }

    setShowToast(idx, ev) {
        // console.log('idx-->', idx, '\nshow-->', this.state.toastObj)
        const toastClone = this.state.toastObj.filter(t => t.id !== idx);
        this.setState({
            toastObj: toastClone,
        });
    }

    addToast(toastAlert) {
        const clonedToast = [...this.state.toastObj];
        clonedToast.push(toastAlert);
        this.setState({
            toastObj: clonedToast,
        });
    }

    render() {
        const {
            currentScheduleNo,
            isLoadingSubjectCourse,
            isLoadingGenerateSchedule,
            showModalSave,
            userSchedulesList,
            schedulesToDisplay,
            activeTab,
            showModalDelete,
            showToast,
            toastObj,
        } = this.state;

        const token = this.props.user.token;
        const { termList, isLoadingTermList, selectedTerm } = this.props.classes.terms;
        const { subjectList, selectedSubject } = this.props.classes.subject;
        const { possibleSchedules, selectedSubjects } = this.props.schedules;
        const { classesListSearch } = this.props.classes.classes;

        // console.log("Is there a valid token?", token);
        // console.log(
        //     this.props.user.userInfo.email
        //         ? "Valid email found--> " + this.props.user.userInfo.email
        //         : "---->No email available <----"
        // );

        return (
            <Container>
                <Form lg="12" className="subject-form">
                    <Form.Row>
                        <Col lg="4">
                            <Form.Label
                                htmlFor="termDropbox"
                                id="termId"
                                className="search-subject-form"
                            >
                                <h2>Term</h2>
                                {isLoadingTermList && (
                                    <Spinner animation="border" size="md" />
                                )}
                            </Form.Label>
                            {selectedTerm ? (
                                <Form.Row>
                                    <Col lg="10">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={selectedTerm}
                                            aria-labelledby="termId"
                                            id="termDropbox"
                                        />
                                    </Col>
                                    <Col lg="2">
                                        <Button variant="danger" onClick={this.clear}>
                                            X
                                        </Button>
                                    </Col>
                                </Form.Row>
                            ) : (
                                <Form.Control
                                    as="select"
                                    value={selectedTerm}
                                    onChange={this.handleSelectTerm}
                                    aria-labelledby="termId"
                                    id="termDropbox"
                                >
                                    <option>Choose...</option>
                                    {termList.map(term => (
                                        <option key={term._id}>{term.Termname}</option>
                                    ))}
                                </Form.Control>
                            )}
                        </Col>
                        <Col lg="4">
                            <Form.Label
                                htmlFor="subjectDropbox"
                                id="subjectId"
                                className="search-subject-form"
                            >
                                <h2>Subject</h2>
                                {this.props.classes.subject.isLoading && (
                                    <Spinner animation="border" size="md" />
                                )}
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedSubject}
                                onChange={this.handleSubjectChange}
                                disabled={!selectedTerm}
                                data-testid="subject-form-control"
                                aria-labelledby="subjectId"
                                id="subjectDropbox"
                            >
                                <option>Choose...</option>
                                {subjectList.map(subj => (
                                    <option key={subj._id}>{subj.Name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col lg="4">
                            <Form.Label
                                htmlFor="courseInput"
                                id="courseId"
                                className="search-subject-form"
                            >
                                <h2>Search</h2>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="course"
                                placeholder="Course"
                                value={this.state.course}
                                disabled={!selectedSubject}
                                onChange={this.handleCourseSearch}
                                aria-labelledby="courseId"
                                id="courseInput"
                            />
                        </Col>
                    </Form.Row>
                </Form>

                <Row>
                    {possibleSchedules.length === 0 ? (
                        <Col lg="9">
                            <h2>List</h2>
                            <div className="search-calendar">
                                <ClassesTable
                                    classes={classesListSearch}
                                    selectSub={this.selectSub}
                                    clickSubj={this.clickSubj}
                                />
                                {isLoadingSubjectCourse && (
                                    <div style={{ textAlign: "center" }}>
                                        <Spinner animation="border" />
                                    </div>
                                )}
                            </div>
                        </Col>
                    ) : (
                        <Col lg="9">
                            <div style={{ margin: "20px 0 0 0" }}>
                                {token ? (
                                    <DropdownButton
                                        size="lg"
                                        id="dropdown-scheduleList"
                                        title={
                                            <span>
                                                Calendars
                                                <Badge className="ml-2" variant="light">
                                                    {userSchedulesList.length}
                                                </Badge>
                                            </span>
                                        }
                                    >
                                        {userSchedulesList.map((item, idx) => (
                                            <Dropdown.Item
                                                eventKey={idx}
                                                onClick={this.showSchedule.bind(
                                                    this,
                                                    idx
                                                )}
                                                key={idx}
                                                as="button"
                                            >
                                                {item.name}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                ) : (
                                    <h2>Calendar</h2>
                                )}

                                {token && schedulesToDisplay && (
                                    <Tabs
                                        activeKey={activeTab}
                                        id="uncontrolled-tab-example"
                                        onSelect={t => this.setKey(t)}
                                    >
                                        <Tab
                                            eventKey="home"
                                            title={
                                                <span>
                                                    Generated
                                                    <Button
                                                        variant="success"
                                                        className="ml-1 float-md-right"
                                                        size="sm"
                                                        aria-label="save calendar"
                                                        onClick={this.handleModalSave}
                                                    >
                                                        {saveIcon}
                                                        <span aria-hidden="true"></span>
                                                    </Button>
                                                </span>
                                            }
                                        ></Tab>
                                        {schedulesToDisplay.map((item, idx) => (
                                            <Tab
                                                key={idx}
                                                eventKey={item.name}
                                                title={
                                                    <span>
                                                        {item.name}
                                                        <Button
                                                            className="ml-1 float-md-right close"
                                                            onClick={this.removeFromUserSchedule.bind(
                                                                this,
                                                                item._id
                                                            )}
                                                        >
                                                            <span aria-hidden="true">
                                                                &times;
                                                            </span>
                                                        </Button>
                                                    </span>
                                                }
                                            >
                                                <Button
                                                    className="float-md-right"
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={this.deleteUserSchedule.bind(
                                                        this,
                                                        item._id,
                                                        item.name
                                                    )}
                                                >
                                                    {trashIcon}
                                                </Button>
                                                <Calendar
                                                    selectedSub={item.selectedSubjects}
                                                    schedule={item.schedule}
                                                />
                                            </Tab>
                                        ))}
                                    </Tabs>
                                )}
                            </div>
                        </Col>
                    )}

                    <Col lg="3">
                        <h2>Selected</h2>
                        <ListGroup className="search-selected">
                            {selectedSubjects.map(item => (
                                <ListGroup.Item
                                    style={{
                                        border: "1px solid black",
                                    }}
                                    key={item._id}
                                >
                                    <Row className="justify-content-md-center">
                                        <Col xs={10}>
                                            <Row>
                                                {item.Subj}
                                                {item.Crse}
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Button
                                                    onClick={() =>
                                                        this.removeSub(item._id)
                                                    }
                                                    style={{
                                                        margin: "auto",
                                                    }}
                                                >
                                                    <span aria-hidden="true">
                                                        &times;
                                                    </span>
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="search-generate-button">
                    <Col lg="6">
                        {possibleSchedules.length === 0 && (
                            <Button
                                style={{ margin: "0 0 10px 0" }}
                                onClick={
                                    !isLoadingGenerateSchedule
                                        ? this.handleGenerateSchedule
                                        : null
                                }
                                disabled={
                                    isLoadingGenerateSchedule ||
                                    selectedSubjects.length === 0
                                }
                                block
                            >
                                {isLoadingGenerateSchedule ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading Schedules
                                    </>
                                ) : (
                                    "Generate Schedules"
                                )}
                            </Button>
                        )}
                    </Col>
                    <Col>
                        <Button
                            style={{ margin: "0 0 10px 0" }}
                            variant="danger"
                            onClick={this.clear}
                            block
                        >
                            Clear
                        </Button>
                    </Col>
                </Row>
                <Modal
                    centered
                    size="sm"
                    show={showModalSave}
                    onHide={this.handleModalSave}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Schedule name </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SaveScheduleForm
                            handleClose={this.handleModalSave}
                            possibleSchedules={possibleSchedules[currentScheduleNo]}
                            addUserSchedule={this.addUserSchedule}
                            selectedSub={selectedSubjects}
                            addToast={this.addToast}
                        />
                    </Modal.Body>
                </Modal>
                <Modal
                    centered
                    size="sm"
                    show={showModalDelete}
                    onHide={this.handleModalDelete}
                >
                    <Modal.Header closeButton>Confirm deletion</Modal.Header>
                    <Modal.Body className="mx-auto">
                        <p> Delete {selectedSchedule.name} schedule? </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup className="flex-fill" aria-label="Basic buttons">
                            <Button
                                className="flex-fill"
                                variant="danger"
                                onClick={this.handleDeleteSchedule}
                            >
                                Delete
                            </Button>
                            <Button
                                className="flex-fill"
                                variant="primary"
                                onClick={this.handleModalDelete}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    classes: state.classes,
    schedules: state.schedules,
});

const matDispatchToProps = dispatch => ({
    getTermList: () => dispatch(classesActions.getTerms()),
    setSelectedTerm: termname => dispatch(classesActions.setSelectedTerm(termname)),
    getSubjectCourse: (subject, term) =>
        dispatch(classesActions.getClasses(subject, term)),
    clearTerm: () => dispatch(classesActions.clearSelectedTerm()),
    generateSchedule: selectedSubjects =>
        dispatch(scheduleActions.generateSchedules(selectedSubjects)),
    addSubject: subject => dispatch(scheduleActions.addSubject(subject)),
    removeSubject: subjectId => dispatch(scheduleActions.removeSubject(subjectId)),
    clearSelectedSubjects: () => dispatch(scheduleActions.clearSelectedSubjects()),
    searchClass: searchKey => dispatch(classesActions.searchClass(searchKey)),
    updateListCheck: subjectId => dispatch(classesActions.updateListCheck(subjectId)),
});

export default connect(mapStateToProps, matDispatchToProps)(Search);

// {item.type} {item.days} {item.hours} {item.room} {item.instr}

// <CourseInformation currentSelected={currentSelected} />
