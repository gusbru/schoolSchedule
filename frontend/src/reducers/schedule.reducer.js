import { scheduleConstants } from "../constants/schedule.constants";

const initialState = {
    scheduleList: [],
    possibleSchedules: [],
    selectedSubjects: [],
    isLoading: true,
    errorMessage: "",
};

export const schedules = (state = initialState, action) => {
    switch (action.type) {
        case scheduleConstants.GETALL_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case scheduleConstants.GETALL_SUCCESS:
            return {
                ...state,
                scheduleList: [...action.scheduleList],
                isLoading: false,
            };
        case scheduleConstants.GETALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        case scheduleConstants.GENERATE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case scheduleConstants.GENERATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                possibleSchedules: [...action.scheduleList],
            };
        case scheduleConstants.GENERATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        case scheduleConstants.ADD_SUBJECT:
            return {
                ...state,
                selectedSubjects: [...state.selectedSubjects, action.subject],
            };
        case scheduleConstants.REMOVE_SUBJECT:
            return {
                ...state,
                selectedSubjects: state.selectedSubjects.filter(
                    item => item._id !== action.subjectId
                ),
            };
        case scheduleConstants.CLEAR_SELECTED:
            return {
                ...state,
                selectedSubjects: [],
            };
        default:
            return state;
    }
};
