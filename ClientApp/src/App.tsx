import React, { Component } from 'react';

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    {/*<Route path="/" element={<Layout />}>*/}
                    {/*    <Route path="home" element={<Home />} />*/}
                    {/*    <Route element={<PrivateOutlet />}>*/}
                    {/*        <Route path="test" element={<Test />} />*/}
                    {/*    </Route>*/}
                    {/*</Route>*/}
                    {/*<Route path="/login" element={<Login />} />*/}

                    {/*<Route path="/register" element={<Register />} />*/}
                    <Routes>
                        <Route path="*" element={<Home />} />
                    </Routes>
                </CssBaseline>
            </ThemeProvider>
        );
    }
}
