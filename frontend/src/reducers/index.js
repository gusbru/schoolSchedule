import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { classes } from "./classes.reducer";
import { admin } from "./admin.reducer";
import { schedules } from "./schedule.reducer";

const rootReducer = combineReducers({
    user,
    classes,
    admin,
    schedules,
});

export default rootReducer;
