import React from "react"
import {useEffect, useState} from "react";
import {get} from "@rails/request.js"
import levenshtein from 'js-levenshtein';

export function Contacts() {
    const MIN_DISTANCE = 3;
    const [contacts, setContacts] = useState([])
    const [filter, setFilter] = useState("")
    const [filteredContacts, setFilteredContacts] = useState([])

    const [error, setError] = useState("")
    const updateFilter = (e) => {
        setFilter(e.target.value)

    }
    useEffect(() => {
        let foo = contacts;
        if (filter) {
            foo = contacts.filter((contact) => {
                const names = contact.name.split(" ");
                const filteredNames = names.filter((name: string) => {
                    const distance = levenshtein(name, filter)
                    return distance < MIN_DISTANCE
                })
                console.log(filteredNames.length > 0)
                return filteredNames.length > 0
            })
        }
        setFilteredContacts(foo)
    }, [contacts, filter])

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
        <input
            type="text"
            value={filter}
            onChange={updateFilter}
        />
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {filteredContacts.map((contact: { name: string, email: string }, key: React.Key) => {
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