import { classesConstants } from "../constants/classes.constants";

const emptySchedule = [];
for (let i = 0; i < 14; i++) {
    emptySchedule.push([]);
    for (let j = 0; j < 6; j++) {
        emptySchedule[i].push([]);
    }
}

const initialState = {
    terms: {
        termList: [],
        isLoadingTermList: false,
        selectedTerm: "",
        message: "",
    },
    schedule: {
        schedule: emptySchedule,
        isLoadingSchedule: false,
        possibleSchedules: [],
        currentScheduleNo: 0,
        message: "",
    },
    subject: {
        subjectList: [],
        selectedSubject: "",
        isLoading: false,
        message: "",
    },
    classes: {
        classesList: [],
        classesListSearch: [],
        isLoading: false,
        message: "",
    },
};

export const classes = (state = initialState, action) => {
    switch (action.type) {
        case classesConstants.START_LOAD_TERMS:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    isLoadingTermList: true,
                },
            };
        case classesConstants.END_LOAD_TERMS_SUCCESS:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    isLoadingTermList: false,
                    termList: [...action.termList],
                },
            };
        case classesConstants.END_LOAD_TERMS_FAILURE:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    isLoadingTermList: false,
                    termList: [],
                    message: action.message,
                },
            };
        case classesConstants.START_SELECT_TERM:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    selectedTerm: action.termname,
                },
                subject: {
                    ...state.subject,
                    isLoading: true,
                },
            };
        case classesConstants.END_SELECT_TERM_SUCCESS:
            return {
                ...state,
                subject: {
                    ...state.subject,
                    isLoading: false,
                    subjectList: [...action.subjects],
                },
            };
        case classesConstants.CLEAR_SELECTED_TERM:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    selectedTerm: "",
                },
                schedule: {
                    ...state.schedule,
                    schedule: emptySchedule,
                    possibleSchedules: [],
                    currentScheduleNo: 0,
                },
                subject: {
                    ...state.subject,
                    selectedSubject: "",
                    subjectList: [],
                },
                classes: {
                    ...state.classes,
                    classesList: [],
                    classesListSearch: [],
                },
            };
        case classesConstants.START_LOAD_CLASSES:
            return {
                ...state,
                classes: {
                    ...state.classes,
                    isLoading: true,
                },
                subject: {
                    ...state.subject,
                    selectedSubject: action.subject,
                },
            };
        case classesConstants.END_LOAD_CLASSES_SUCCESS:
            return {
                ...state,
                classes: {
                    ...state.classes,
                    isLoading: false,
                    classesList: [...action.classes],
                    classesListSearch: [...action.classes],
                },
            };
        case classesConstants.END_LOAD_CLASSES_FAILURE:
            return {
                ...state,
                classes: {
                    ...state.classes,
                    isLoading: false,
                    message: action.message,
                },
            };
        case classesConstants.SEARCH_COURSE:
            return {
                ...state,
                classes: {
                    ...state.classes,
                    classesListSearch: [
                        ...state.classes.classesList.filter(s =>
                            s.Subj.toLowerCase()
                                .concat(s.Crse.trim())
                                .concat(s.Title.toLowerCase())
                                .includes(action.searchKey.trim().toLowerCase())
                        ),
                    ],
                },
            };
        case classesConstants.UPDATE_LIST_SELECT:
            const subjId = state.classes.classesListSearch.findIndex(
                s => s._id === action.subjectId
            );
            const tmpList = [...state.classes.classesListSearch];
            if (subjId >= 0) tmpList[subjId].isSelected = false;
            return {
                ...state,
                classes: {
                    ...state.classes,
                    classesListSearch: [...tmpList],
                },
            };
        default:
            return state;
    }
};
