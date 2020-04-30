import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import history from "../../components/History";
import LoginForm from "../../components/LoginForm";
import "./Login.css";

export default function Login() {
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.token) {
            history.push("/");
        }
    }, [user]);

    return (
        <Container className="login-container">
            <Jumbotron>
                <h1>Login</h1>
                <LoginForm />
            </Jumbotron>
        </Container>
    );
}
