import React from "react";
import "./List.css";

export default function List(props) {
    const { dbList, handleClick } = props;

    return (
        <div className="row">
            <ul className="list-group col-md-12">
                {dbList.length === 0 ? (
                    <li className="list-group-item">No calendars to display</li>
                ) : (
                    dbList.map(file => (
                        <li key={file._id} className="list-group-item">
                            {file.Termname}
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => handleClick(file)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
