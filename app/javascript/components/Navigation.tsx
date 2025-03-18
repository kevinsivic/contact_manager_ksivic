import {Link} from "react-router-dom";
import React from "react";

export function Navigation() {
    return <>
        <hr className="my-4"/>
        <Link
            to="/contacts"
            className="btn btn-lg custom-button"
            role="button"
        >
            View Contacts
        </Link>
        <Link to="/contacts/new"
              className="btn btn-lg custom-button"
              role="button"
        >
            Create New Contact
        </Link>
    </>;
}