import { URL } from "./config";

/**
 * user {
 *      name: "some name",
 *      email: "some email",
 *      password: "some password"
 * }
 *
 */
export const addSchedule = async schedule => {
    try {
        const addNewSchedule = await window.fetch(
            URL + "/api/calendarhandler/addcalendar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(schedule),
            }
        );

        if (addNewSchedule.ok) {
            const newUser = await addNewSchedule.json();
            return newUser;
        } else {
            const errObj = await addNewSchedule.json();
            //console.log('API - Not ok version-->\n', errObj)
            return errObj;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSchedulesList = async token => {
    try {
        if (!token) throw new Error("empty token");

        const schedulesListRequest = await window.fetch(
            `${URL}/api/calendarhandler/getscheduleslist`,
            {
                method: "GET",
                headers: {
                    token: token,
                },
            }
        );

        if (schedulesListRequest.ok) {
            const scheduleList = await schedulesListRequest.json();
            return scheduleList;
        } else {
            throw new Error("Error getting schedules list");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const removeSchedule = async (email, _id) => {
    //console.log('inside removeSchedule \n email--->', email,'\n_id--->', _id)  ;
    try {
        if (!email || !_id) {
            throw new Error("No email/_id parameter provided");
        }
        const deleteScheduleRequest = await window.fetch(
            `${URL}/api/calendarhandler/deleteschedule?email=${email}&_id=${_id}`,
            {
                method: "DELETE",
            }
        );

        if (deleteScheduleRequest.ok) {
            return;
        } else {
            throw new Error("Error deleting file");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
