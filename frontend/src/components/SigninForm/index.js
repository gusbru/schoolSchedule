import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signIn = this.props.signIn.bind(this);

        this.handleClose = this.props.handleClose.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, email, password } = this.state;

        this.signIn(name, email, password);


        this.handleClose();
    }

    render() {
        const { name, email, password } = this.state;

        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Sign In
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    signIn: (name, email, password) =>
        dispatch(userActions.signIn(name, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
