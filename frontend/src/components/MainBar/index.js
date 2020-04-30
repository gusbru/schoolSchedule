import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../actions";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import history from "../History";
import avatar from "../../img/yyycatch-people-biz2-male-smile.svg";

export default function MainBar(props) {
    const { pages } = props;

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Scheduler</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {pages.map(page => (
                            <Nav.Link
                                key={page.path}
                                onClick={() => history.push(page.path)}
                            >
                                {page.title}
                            </Nav.Link>
                        ))}
                    </Nav>

                    {user.token ? (
                        <NavDropdown
                            title={
                                <>
                                    <Image
                                        src={avatar}
                                        width={30}
                                        height={30}
                                        roundedCircle
                                        alt="avatar"
                                    />
                                    {user.userInfo.email}
                                </>
                            }
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item>User Info</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                onClick={() => dispatch(userActions.logout())}
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            {" "}
                            <Button
                                variant="dark"
                                name="login"
                                onClick={() => history.push("/login")}
                            >
                                Login
                            </Button>
                            <Button variant="dark" name="signin">
                                SignIn
                            </Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
