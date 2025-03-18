import React from "react";
import {Navigation} from "./Navigation";

export default () => (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <h1 className="display-4">Contact Manager</h1>
                <p className="lead">
                    A list of contacts to maintain your connections!
                </p>
                <Navigation/>
            </div>
        </div>
    </div>
);
