import { scheduleConstants } from "../constants/schedule.constants";
import { getSchedulesList } from "../api/Calendar";
import { getSchedules } from "../api/Subjects";
import history from "../components/History";

const getAllSchedules = token => async dispatch => {
    try {
        dispatch({
            type: scheduleConstants.GETALL_REQUEST,
        });

        const scheduleList = await getSchedulesList(token);

        dispatch({
            type: scheduleConstants.GETALL_SUCCESS,
            scheduleList,
        });
    } catch (error) {
        dispatch({
            type: scheduleConstants.GETALL_FAILURE,
            errorMessage: error.message,
        });
    }
};

const generateSchedules = selectedSub => async dispatch => {
    try {
        dispatch({
            type: scheduleConstants.GENERATE_REQUEST,
        });

        const scheduleList = await getSchedules(selectedSub);

        dispatch({
            type: scheduleConstants.GENERATE_SUCCESS,
            scheduleList,
        });

        history.push("/calendars");
    } catch (error) {
        dispatch({
            type: scheduleConstants.GENERATE_FAILURE,
            errorMessage: error.message,
        });
    }
};

const addSubject = subject => {
    return {
        type: scheduleConstants.ADD_SUBJECT,
        subject,
    };
};

const removeSubject = subjectId => {
    return {
        type: scheduleConstants.REMOVE_SUBJECT,
        subjectId,
    };
};

const clearSelectedSubjects = () => {
    return {
        type: scheduleConstants.CLEAR_SELECTED,
    };
};

export const scheduleActions = {
    getAllSchedules,
    generateSchedules,
    addSubject,
    removeSubject,
    clearSelectedSubjects,
};
