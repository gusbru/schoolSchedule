import Admin from "../components/Admin";
import Landing from "./Landing";
import SavedSchedules from "./SavedSchedules";
import Search from "./Search";
import Login from "./Login";
import Calendars from "./Calendars";

const Pages = [
    {
        component: Landing,
        path: "/",
        title: "Home",
        restricted: false,
        displayNavbar: true,
    },
    {
        component: Search,
        path: "/search",
        title: "Search",
        restricted: false,
        displayNavbar: true,
    },
    {
        component: SavedSchedules,
        path: "/schedules",
        title: "Calendars",
        restricted: true,
        displayNavbar: true,
    },
    {
        component: Admin,
        path: "/admin",
        title: "Admin",
        restricted: false,
        displayNavbar: true,
    },
    {
        component: Login,
        path: "/login",
        title: "Login",
        restricted: false,
        displayNavbar: false,
    },
    {
        component: Calendars,
        path: "/calendars",
        title: "Calendars",
        restricted: false,
        displayNavbar: false,
    },
];

export default Pages;
