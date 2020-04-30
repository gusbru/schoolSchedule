import { userConstants } from "../constants/user.constants";
import { checkToken, authenticate, registerUser } from "../api/User";
import history from "../components/History";

const verifyToken = token => async dispatch => {
    try {
        dispatch({
            type: userConstants.START_CHECK_TOKEN,
        });

        // try to get token from local storage
        const token = window.localStorage.getItem("scheduler_token");

        if (!token) {
            dispatch({
                type: userConstants.END_VISITOR_CHECK_TOKEN,
            });
            return;
        }

        const { email } = await checkToken(token);

        if (email) {
            dispatch({
                type: userConstants.END_SUCCESS_CHECK_TOKEN,
                token,
                email,
            });
        } else {
            window.localStorage.removeItem("scheduler_token");
            dispatch({
                type: userConstants.END_FAIL_CHECK_TOKEN,
                message: "Invalid token",
            });
        }
    } catch (error) {
        console.log("error checking token", error);
        window.localStorage.removeItem("scheduler_token");
        dispatch({
            type: userConstants.END_FAIL_CHECK_TOKEN,
            message: error.message,
        });
    }
};

const login = (email, password) => async dispatch => {
    try {
        dispatch({
            type: userConstants.START_LOGIN_USER,
        });

        const { token } = await authenticate({ email, password });

        // save token to local storage
        window.localStorage.setItem("scheduler_token", token);

        dispatch({
            type: userConstants.END_SUCCESS_LOGIN_USER,
            email,
            token,
        });
    } catch (error) {
        dispatch({
            type: userConstants.END_FAIL_LOGIN_USER,
            message: error.message,
        });
    }
};

const logout = () => async dispatch => {
    window.localStorage.removeItem("scheduler_token");

    history.push("/");

    dispatch({
        type: userConstants.START_LOGOUT_USER,
    });
};

const signIn = (name, email, password) => async dispatch => {
    try {
        dispatch({
            type: userConstants.START_SIGNIN_USER,
        });

        const user = await registerUser({ name, email, password });

        dispatch({
            type: userConstants.END_SIGNIN_USER_SUCCESS,
            email: user.email,
            token: user.token,
        });
    } catch (error) {
        console.log("error =", error.message);
        dispatch({
            type: userConstants.END_SIGNIN_USER_FAIL,
            message: error.message,
        });
    }
};

export const userActions = {
    verifyToken,
    login,
    logout,
    signIn,
};
