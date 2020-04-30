import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import NavigationBar from "../NavigationBar";
import Container from "react-bootstrap/Container";
import Search from "../Search";
import "./App.css";

function App() {
    const user = useSelector(state => state.user);

    return <Container>{user.isLoading ? <LoadingSpinner /> : <Search />}</Container>;
}

export default App;
