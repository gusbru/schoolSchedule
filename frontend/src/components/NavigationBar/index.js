import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginSigninModal from "../LoginSigninModal";
import Button from "react-bootstrap/Button";
import LoginForm from "../LoginForm";
import SigninForm from "../SigninForm";
import Image from "react-bootstrap/Image";
import avatar from "../../img/yyycatch-people-biz2-male-smile.svg";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            component: "",
            action: "",
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleLogout = this.props.handleLogout.bind(this);
    }

    handleShow(event) {
        const formType = event.target.name;

        this.setState({
            show: true,
            component:
                formType === "login" ? (
                    <LoginForm handleClose={this.handleClose} />
                ) : (
                    <SigninForm handleClose={this.handleClose} />
                ),
            action: event.target.name,
        });
    }

    handleClose() {
        this.setState({
            show: false,
            component: "",
        });
    }

    render() {
        const { show, component, action } = this.state;
        const { token, userInfo } = this.props.user;

        return (
            <div style={{ marginBottom: "20px" }}>
                <Navbar bg="dark" variant="dark" expand="lg">
                    {token && (
                        <Container>
                            <Row>
                                <Col>
                                    <Image
                                        src={avatar}
                                        width={40}
                                        height={40}
                                        roundedCircle
                                        alt="avatar"
                                    />
                                </Col>
                                <Col style={{ color: "white" }}>{userInfo.email}</Col>
                            </Row>
                        </Container>
                    )}
                    <Navbar.Toggle aria-controls="main-navbar-nav" />
                    <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
                        <Navbar.Text className="mr-right">
                            {token ? (
                                <Button
                                    variant="dark"
                                    name="logout"
                                    onClick={this.handleLogout}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <div>
                                    <Button
                                        variant="dark"
                                        name="login"
                                        onClick={this.handleShow}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="dark"
                                        name="signin"
                                        onClick={this.handleShow}
                                    >
                                        SignIn
                                    </Button>
                                </div>
                            )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <LoginSigninModal
                    handleClose={this.handleClose}
                    show={show}
                    component={component}
                    title={action.toUpperCase()}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleLogout: () => dispatch(userActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
