import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRedux } from "../../utils/testUtils";
import Search from "./";

afterEach(cleanup);

it("subject should be disabled", () => {
    const { getByTestId } = renderWithRedux(<Search />);

    expect(getByTestId("subject-form-control")).toBeDisabled();
});
