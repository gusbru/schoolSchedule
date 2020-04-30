import React from "react";
import Modal from "react-bootstrap/Modal";

class LoginSigninModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.props.handleClose.bind(this);
    }

    render() {
        const { show, component, title } = this.props;

        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{component}</Modal.Body>
            </Modal>
        );
    }
}

export default LoginSigninModal;
