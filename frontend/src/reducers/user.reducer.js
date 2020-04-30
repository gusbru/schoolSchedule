import { userConstants } from "../constants/user.constants";

const initialState = {
    userInfo: {},
    isLoading: false,
    token: "",
    message: "",
    error: false
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.START_ADD_NEW_USER:
            return {
                ...state,
                isLoading: true,
            };
        case userConstants.START_CHECK_TOKEN:
            return {
                ...state,
                isLoading: true,
            };
        case userConstants.END_SUCCESS_CHECK_TOKEN:
            return {
                ...state,
                isLoading: false,
                token: action.token,
                userInfo: {
                    email: action.email,
                },
                error: false
            };
        case userConstants.END_FAIL_CHECK_TOKEN:
            return {
                ...state,
                isLoading: false,
                token: "",
                userInfo: {},
                message: action.message || "",
            };
        case userConstants.END_VISITOR_CHECK_TOKEN:
            return {
                ...state,
                isLoading: false,
            };
        case userConstants.START_LOGIN_USER:
            return {
                ...state,
                isLoading: true,
            };
        case userConstants.END_SUCCESS_LOGIN_USER:
            return {
                ...state,
                isLoading: false,
                message: "User logged in",
                token: action.token,
                userInfo: {
                    email: action.email,
                },
                error: false
            };
        case userConstants.END_FAIL_LOGIN_USER:
            return {
                ...state,
                isLoading: false,
                message: "Login Failed",
                token: "",
                userInfo: {},
                error: true
            };
        case userConstants.START_LOGOUT_USER:
            return {
                ...state,
                userInfo: {},
                isLoading: false,
                token: "",
                message: "User Loggout",
            };
        case userConstants.START_SIGNIN_USER:
            return {
                ...state,
                isLoading: true,
            };
        case userConstants.END_SIGNIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: {
                    email: action.email,
                },
                token: action.token,
                error: false
            };
        case userConstants.END_SIGNIN_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                token: "",
                message: action.message,
                error: true
            };
        default:
            return state;
    }
};
