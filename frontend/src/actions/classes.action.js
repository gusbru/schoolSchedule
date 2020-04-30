import { classesConstants } from "../constants/classes.constants";
import { getTermList } from "../api/Admin";
import { getSubjectByTerm, getSubjectCourse } from "../api/Subjects";

const getTerms = () => async dispatch => {
    try {
        dispatch({
            type: classesConstants.START_LOAD_TERMS,
        });

        const termList = await getTermList();

        dispatch({
            type: classesConstants.END_LOAD_TERMS_SUCCESS,
            termList,
        });
    } catch (error) {
        dispatch({
            type: classesConstants.END_LOAD_TERMS_FAILURE,
            message: error.message,
        });
    }
};

const setSelectedTerm = termname => async dispatch => {
    try {
        dispatch({
            type: classesConstants.START_SELECT_TERM,
            termname,
        });

        const subjects = await getSubjectByTerm(termname);

        dispatch({
            type: classesConstants.END_SELECT_TERM_SUCCESS,
            subjects,
        });
    } catch (error) {
        dispatch({
            type: classesConstants.END_LOAD_TERMS_FAILURE,
        });
    }
};

const clearSelectedTerm = () => {
    return {
        type: classesConstants.CLEAR_SELECTED_TERM,
    };
};

const clearClassList = () => {
    return {
        type: classesConstants.CLEAR_CLASS_LIST,
    };
};

const searchClass = searchKey => {
    return {
        type: classesConstants.SEARCH_COURSE,
        searchKey,
    };
};

const getClasses = (subject, term) => async dispatch => {
    try {
        dispatch({
            type: classesConstants.START_LOAD_CLASSES,
            subject,
        });

        const classes = await getSubjectCourse(subject, term);

        dispatch({
            type: classesConstants.END_LOAD_CLASSES_SUCCESS,
            classes,
        });
    } catch (error) {
        dispatch({
            type: classesConstants.END_LOAD_CLASSES_FAILURE,
            message: error.message,
        });
    }
};

const updateListCheck = subjectId => {
    return {
        type: classesConstants.UPDATE_LIST_SELECT,
        subjectId,
    };
};

export const classesActions = {
    getTerms,
    setSelectedTerm,
    clearSelectedTerm,
    clearClassList,
    getClasses,
    searchClass,
    updateListCheck,
};
