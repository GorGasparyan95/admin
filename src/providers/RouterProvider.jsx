import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import routes from '../pages/config'
import ScrollToTop from "./ScrollToTop";


const RouterProvider = () => {
    return (
        <Router>
            <ScrollToTop>
                <Routes >
                    {
                        routes.map(({ path, element }) => (
                            <Route
                                key={path}
                                path={path}
                                element={element}
                            />
                        ))
                    }
                </Routes>
            </ScrollToTop>
        </Router>
    )
}

export default RouterProvider