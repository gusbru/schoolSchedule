import React from "react";
import "./LoadingSpinner.css";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner() {
    return (
        <div style={{ textAlign: "center" }}>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
}
