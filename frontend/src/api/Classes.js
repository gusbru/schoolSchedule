import { URL } from "./config";

export const getAllClasses = async () => {
    try {
        const classList = await window.fetch(URL + "/api/classes", {
            method: "GET",
        });

        if (classList.ok) {
            const allClassesList = await classList.json();
            return allClassesList;
        } else {
            throw new Error("Error retrieving all classes");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
