import { adminConstants } from "../constants/admin.constants";

const initialState = {
    terms: {
        termList: [],
        isLoading: false,
        message: "",
    },
    upload: {
        progress: 0,
        uploadedFile: "",
        message: "",
    },
    delete: {
        isDeleting: false,
        message: "",
    },
};

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case adminConstants.START_LOAD_TERMS:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    isLoading: true,
                },
            };
        case adminConstants.END_LOAD_TERMS_SUCCESS:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    termList: [...action.termList],
                    isLoading: false,
                },
            };
        case adminConstants.END_LOAD_TERMS_FAILURE:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    termList: [],
                    isLoading: false,
                    message: action.message,
                },
            };
        case adminConstants.UPDATE_PROGRESS:
            return {
                ...state,
                upload: {
                    ...state.upload,
                    progress: action.value,
                },
            };
        case adminConstants.END_SUCCESS_LOAD_SCHEDULES:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    termList: [...state.terms.termList, action.uploadedFile],
                },
                upload: {
                    ...state.upload,
                    progress: 0,
                    uploadedFile: action.uploadedFile,
                },
            };
        case adminConstants.END_FAIL_LOAD_SCHEDULES:
            return {
                ...state,
                upload: {
                    ...state.upload,
                    message: action.message,
                },
            };
        case adminConstants.START_DELETE_SCHEDULE:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    isDeleting: true,
                },
            };
        case adminConstants.END_SUCCESS_DELETE_SCHEDULE:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    termList: state.terms.termList.filter(
                        item => item.Termname !== action.termname
                    ),
                },
                delete: {
                    ...state.delete,
                    isDeleting: false,
                },
            };
        case adminConstants.END_FAIL_DELETE_SCHEDULE:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    isDeleting: false,
                },
            };
        default:
            return state;
    }
};
