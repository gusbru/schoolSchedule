import { adminConstants } from "../constants/admin.constants";
import { getTermList, uploadFileWithProgress, removeFile } from "../api/Admin";

const getTerms = () => async dispatch => {
    try {
        dispatch({
            type: adminConstants.START_LOAD_TERMS,
        });

        const termList = await getTermList();

        dispatch({
            type: adminConstants.END_LOAD_TERMS_SUCCESS,
            termList,
        });
    } catch (error) {
        dispatch({
            type: adminConstants.END_LOAD_TERMS_FAILURE,
            message: error.message,
        });
    }
};

const setProgress = value => {
    return {
        type: adminConstants.UPDATE_PROGRESS,
        value,
    };
};

const addTerm = (file, termname) => async dispatch => {
    try {
        const uploadedFile = await uploadFileWithProgress(
            file,
            termname,
            setProgress,
            dispatch
        );

        dispatch({
            type: adminConstants.END_SUCCESS_LOAD_SCHEDULES,
            uploadedFile,
        });
    } catch (error) {
        dispatch({
            type: adminConstants.END_FAIL_LOAD_SCHEDULES,
            message: error.message,
        });
    }
};

const deleteTerm = termname => async dispatch => {
    try {
        dispatch({
            type: adminConstants.START_DELETE_SCHEDULE,
        });

        await removeFile(termname);

        dispatch({
            type: adminConstants.END_SUCCESS_DELETE_SCHEDULE,
            termname,
        });
    } catch (error) {
        dispatch({
            type: adminConstants.END_FAIL_DELETE_SCHEDULE,
            message: error.message,
        });
    }
};

export const adminActions = {
    getTerms,
    addTerm,
    deleteTerm,
};
