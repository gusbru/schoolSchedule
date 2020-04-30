import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if (this.props.handleClose) {
            this.handleClose = this.props.handleClose.bind(this);
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const { email, password } = this.state;

        await this.props.login(email, password);

        if (!this.props.user.error) {
            this.handleClose && this.handleClose();
        }
    }

    render() {
        const { email, password } = this.state;
        const { user } = this.props;

        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                    Login
                </Button>
                {user.error && <Alert variant="danger">{user.message}</Alert>}
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(userActions.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
