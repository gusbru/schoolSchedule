import React from "react";
import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "../reducers";
import { render } from "@testing-library/react";

export const renderWithRedux = (
    component,
    { store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware))) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};
