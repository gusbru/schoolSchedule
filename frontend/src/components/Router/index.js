import React, { useEffect } from "react";
import { Router as ReactRouter, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactGA from "react-ga";
import history from "../History";
import PrivateRoute from "../PrivateRoute";
import { userActions } from "../../actions";
import MainBar from "../MainBar";
import Pages from "../../pages";

// initialize ReactGA
const trackingId = "UA-158062871-2";
ReactGA.initialize(trackingId);

// Initialize google analytics page view tracking
history.listen(location => {
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function Router() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    let navbarPages = Pages.filter(page => page.displayNavbar === true);

    if (!user.token) {
        navbarPages = navbarPages.filter(page => page.restricted === false);
    }

    useEffect(() => {
        dispatch(userActions.verifyToken());
    }, []);

    return (
        <>
            <MainBar pages={navbarPages} />
            <ReactRouter history={history}>
                {Pages.map(page => {
                    if (page.restricted) {
                        return (
                            <PrivateRoute
                                key={page.path}
                                exact
                                path={page.path}
                                component={page.component}
                            />
                        );
                    } else {
                        return (
                            <Route
                                key={page.path}
                                exact
                                path={page.path}
                                component={page.component}
                            />
                        );
                    }
                })}
            </ReactRouter>
        </>
    );
}

export default Router;
