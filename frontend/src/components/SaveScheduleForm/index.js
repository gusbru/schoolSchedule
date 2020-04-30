import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addSchedule } from "../../api/Calendar";

class SaveScheduleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduleName: "",
            formclass:"",
            feedbackMessage:"Only letters, symbols and spaces are allowed on this field"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.props.handleClose.bind(this);
        this.addUserSchedule = this.props.addUserSchedule.bind(this);
        this.addToast = this.props.addToast.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async handleSubmit(ev) {

      if (ev.target.checkValidity() === false){
        ev.preventDefault();
        ev.stopPropagation();

        this.setState({
          feedbackMessage:"Only letters, symbols and spaces are allowed on this field",
          formclass:"was-validated"
        })

      } else {

        ev.preventDefault();
          // console.log(
          //     "Data to be stored on calendar collection\n",
          //     "email-->",
          //     this.props.user.userInfo.email,
          //     "\nschedule name--->",
          //     this.state.scheduleName,
          //     "\nschedule array--->",
          //     this.props.possibleSchedules,
          //     "\nselectedSub--->",
          //     this.props.selectedSub
          // );

          const schedule = {
              email:this.props.user.userInfo.email,
              name:this.state.scheduleName,
              selectedSubArr:this.props.selectedSub,
              schedulesArr:this.props.possibleSchedules
          }


          const res = await addSchedule(schedule);
            if (!res.err){
                //console.log('Successful stored--->\n', res);
                //console.log('\nres._id--->',res._id);

                const dropdownSchedule = {
                    name:this.state.scheduleName,
                    schedule:this.props.possibleSchedules,
                    selectedSub:this.props.selectedSub,
                    _id:res._id
                }

                //console.log('DropdownSchedule content--->\n', dropdownSchedule);

                const toastAlert={
                  id:res._id,
                  header:"Successful stored!",
                  body: `The schedule ${this.state.scheduleName} was successful stored!`
                }

                this.props.addToast(toastAlert);

                this.props.addUserSchedule(dropdownSchedule);
                this.handleClose();
                this.setState({
                  feedbackMessage:"Only letters, symbols and spaces are allowed on this field",
                  formclass:""
                });


            } else {

                //console.log('Error in storing the schedule\n', res);

                this.setState({
                  scheduleName:"",
                  feedbackMessage:res.message,
                  formclass:"was-validated"
                });
            }
      }
    }

    render() {
        const { scheduleName, formclass, feedbackMessage } = this.state;
        //        const {email, possibleSchedules } = this.props;

        return (
            <Form noValidate className={formclass} onSubmit={this.handleSubmit}>
                <Form.Group  controlId="formBasicInput" >
                    <Form.Control
                        required
                        type="text"
                        name="scheduleName"
                        value={scheduleName}
                        placeholder="<name>"
                        onChange={this.handleChange}
                        minLength="2"
                        maxLength="25"
                        pattern="^[^0-9]*[a-zA-Z\u00C0-\u017F]*[\s]*$"
                    />
                    <Form.Control.Feedback type="invalid">
                        {feedbackMessage}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit"  block>
                    Save
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const matDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, matDispatchToProps)(SaveScheduleForm);
