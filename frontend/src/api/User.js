import { URL } from "./config";

/**
 * user {
 *      name: "some name",
 *      email: "some email",
 *      password: "some password"
 * }
 *
 */
export const registerUser = async user => {
    try {
        const newUserStatus = await window.fetch(URL + "/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (newUserStatus.ok) {
            const newUser = await newUserStatus.json();
            return newUser;
        } else {
            const response = await newUserStatus.json();
            throw new Error(response.Error);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * user {
 *      email: "some email",
 *      password: "some password"
 * }
 *
 */
export const authenticate = async user => {
    try {
        const newUserStatus = await window.fetch(`${URL}/api/user/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (newUserStatus.ok) {
            const newUser = await newUserStatus.json();
            return newUser;
        } else {
            throw new Error("Error login in new user");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const checkToken = async token => {
    try {
        const newTokenStatus = await window.fetch(`${URL}/api/user/checkToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (newTokenStatus.ok) {
            const email = await newTokenStatus.json();
            return email;
        } else {
            throw new Error("Invalid token");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
