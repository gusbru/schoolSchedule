import Calendar from "../models/Calendar";
import CalTemplate from "../models/CalTemplate";

const addcalendar = async (req, res, next) => {
    const nameRegExp = RegExp("^[^0-9]*[a-zA-Z\u00C0-\u017F]*[s]*$");
    try {
        const { email, name, schedulesArr, selectedSubArr } = req.body;
        const calendar = await Calendar.findOne({ email: email });
        let _id;

        // server-side name validation
        if (!nameRegExp.test(name)) {
            const customErr = {
                err: 1,
                message: "Only letters, symbols and spaces are allowed on this field",
            };
            res.status(401).send(customErr);
            return;
        }

        if (calendar) {
            const duplicate = calendar.schedules.find(c => c.name === name);

            if (duplicate) {
                const customErr = { err: 1, message: `${name} is already in use` };
                // console.log('Duplicate name found--->', name);
                // const error = new Error(customErr);
                // error.code = 401;
                // return next(error);
                res.status(401).send(customErr);
                /*
            According to Mozilla documentation, the fetch API used in Calendar.js API
            to call addcalendar method does not reject HTTP error status even if the
            response is an HTTP 404 or 500.
            Instead, it will resolve normally (with ok status set to false), and it will
            only reject no network failure or if anything prevented the request
            from completing.
            Because of that, an error trowed by the server will not be caught at Calendar API.
            A workaround is to throw an error after an ok false result, but such an alternative
            does not allow us to send data from the server-side to the client-side.
            The workaround possible here is, instead of throwing an error on server, send a
            response with an statu code 401 and a body object to be caught on Calendar API and,
            then, be sent from there to the client-side, where it can be properly UI handled..
            */
                return;
                /*
            It is necessary put the return statement in order to prevent server-side error : ERR_HTTP_HEADERS_SENT
            You don't want the code to continue after you've done res.status(404).json({ errors }); because it will
            then try to send another response.

            */
            } else {
                const newCaltemplate = new CalTemplate({
                    name: name,
                    selectedSub: selectedSubArr,
                    schedule: schedulesArr,
                });

                calendar.schedules.push(newCaltemplate);

                /*
            Catching the id of the last subdocument "schedule" inserted.
            Whithout it, it would be not possible to delete a record that
            was just added to the dropbox list after saved on database.
            */
                _id = calendar.schedules[calendar.schedules.length - 1]._id;

                await calendar.save();
            }
        } else {
            const newCaltemplate = new CalTemplate({
                name: name,
                selectedSub: selectedSubArr,
                schedule: schedulesArr,
            });

            const newCalendar = new Calendar({
                email: email,
                schedules: [newCaltemplate],
            });

            /*
            Catching the id of the last subdocument "schedule" inserted.
            Whithout it, it would be not possible to delete a record that
            was just added to the dropbox list after saved on database.
            */
            _id = newCalendar.schedules[newCalendar.schedules.length - 1]._id;

            await newCalendar.save();
        }

        // console.log(req.body);

        const savedCalendar = {
            email,
            name,
            selectedSubArr,
            schedulesArr,
            _id,
        };

        res.status(201).send(savedCalendar);
    } catch (error) {
        console.log("error adding new calendar");
        console.log(error);
        error.message = "error adding new user";
        error.code = 500;
        next(error);
    }
};

const getscheduleslist = async (req, res, next) => {
    try {
        const { email } = req;

        const calendar = await Calendar.findOne({ email: email });

        if (calendar) {
            return res.status(201).send(calendar.schedules);
        } else {
            return res.status(201).send([]);
        }
    } catch (error) {
        console.log("Unable to retrieve schedules");
        console.log(error);
        error.code = 401;
        next(error);
    }
};

const deleteschedule = async (req, res, next) => {
    try {
        const { email, _id } = req.query;

        if (!_id || !email) {
            const error = new Error("No _id/schedule name key provided");
            error.code = 401;
            return next(error);
        }
        // console.log('inside deleteschedule\nemail--->', email,'\n_id--->', _id)  ;

        const calendar = await Calendar.findOne({ email: email });
        await calendar.schedules.id(_id).remove();
        await calendar.save();
        // console.log('Schedule removed --->', _id, scheduleRemoved);
        res.status(200).end();
    } catch (error) {
        console.log("Unable to REMOVE schedule");
        console.log(error);
        error.code = 401;
        next(error);
    }
};

const calendarController = {
    addcalendar,
    getscheduleslist,
    deleteschedule,
};

export default calendarController;
