import { URL } from "./config";

export const getAllSubjects = async () => {
    try {
        const subjectList = await window.fetch(`${URL}/api/classes/subject`, {
            method: "GET",
        });

        if (subjectList.ok) {
            const allSubjectsList = await subjectList.json();
            return allSubjectsList;
        } else {
            throw new Error("Error retrieving all subjects");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSubjectByTerm = async term => {
    try {
        const subjectListReq = await window.fetch(
            `${URL}/api/classes/subjectbyterm?term=${term}`,
            {
                method: "GET",
            }
        );

        if (!subjectListReq.ok) {
            throw new Error(`Error retrieving subject for term ${term}`);
        }

        const subjectList = await subjectListReq.json();
        return subjectList;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSubjectCourse = async (subject, term) => {
    try {
        const subjectCourseList = await window.fetch(
            `${URL}/api/classes/subjectCourse?subject=${subject}&term=${term}`,
            {
                method: "GET",
            }
        );

        if (subjectCourseList.ok) {
            const allSubjectsList = await subjectCourseList.json();
            return allSubjectsList;
        } else {
            throw new Error("Error retrieving subject-course");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSchedules = async subjectList => {
    try {
        const subjectCourseList = await window.fetch(
            `${URL}/api/classes/generateSchedules`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subjectList }),
            }
        );

        if (subjectCourseList.ok) {
            const scheduleList = await subjectCourseList.json();
            return scheduleList;
        } else {
            throw new Error("Error generating schedules");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
