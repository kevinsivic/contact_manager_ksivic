import React from "react"
import {useEffect, useState} from "react";
import {get} from "@rails/request.js"

export function Contacts() {
    const [contacts, setContacts] = useState([])
    const [error, setError] = useState("")
    useEffect(() => {
            get("/api/v1/contacts")
                .then(async (response) => {
                    if (response.ok) {
                        setContacts(await response.json)
                    } else {
                        setError("Unable to retrieve contacts, please try again.")
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                    setError("Unable to retrieve contacts, please try again.")
                })
        }, []
    )

    return <div className={"contacts-list"}>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {contacts.map((contact: { name: string, email: string }, key: React.Key) => {
                return (
                    <tr key={key}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>;
}