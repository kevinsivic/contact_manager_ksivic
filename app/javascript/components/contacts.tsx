import React, {ChangeEvent, useEffect, useState} from "react"
import {get, destroy} from "@rails/request.js"
import levenshtein from 'js-levenshtein';
import {Navigation} from "./Navigation";

export function Contacts() {
    const MIN_DISTANCE = 3;
    const [contacts, setContacts] = useState([])
    const [filter, setFilter] = useState("")
    const [filteredContacts, setFilteredContacts] = useState([])
    const [contactToRemove, setContactToRemove] = useState<number | null>(null)

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    function filterMatches(string: string) {
        const lowerCase = string.toLowerCase();
        if (filter == lowerCase.substring(0, filter.toLowerCase().length))
            return true

        const distance = levenshtein(lowerCase, filter.toLowerCase())
        return distance < MIN_DISTANCE;
    }

    function updateContacts() {
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
    }

    function removeContact(id: number) {
        destroy("/api/v1/contacts/" + id)
            .then(async (response) => {
                if (response.ok) {
                    setMessage("Successfully deleted contact")
                } else {
                    setError("Unable to delete contact.")
                }
            })
            .catch((error) => {
                console.log(error.message)
                setError("Unable to delete contact.")
            })
    }

    useEffect(() => {
        if (contactToRemove)
            removeContact(contactToRemove)
        setContactToRemove(null)
        updateContacts()
    }, [contactToRemove])

    useEffect(() => {
        if (!filter) {
            setFilteredContacts(contacts)
        } else {
            setFilteredContacts(contacts.filter((contact: { name: string; email: string; }) => {
                    const names = contact.name.split(" ");
                    const filteredNames = names.filter((name: string) => {
                        return filterMatches(name)
                    })
                    return filteredNames.length > 0 || filterMatches(contact.email)
                })
            )
        }
    }, [contacts, filter])

    useEffect(() => {
        updateContacts();
    }, [])

    function markContactForRemoval(id: number) {
        setContactToRemove(id)
    }

    return <div className={"contacts-list"}>
        <div className={"message"}>{message}</div>
        <div className={"error"}>{error}</div>
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
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {filteredContacts.map((contact: { name: string, email: string, id: number }, key: React.Key) => {
                return (
                    <tr key={key}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>
                            <a onClick={() => markContactForRemoval(contact.id)}>Remove Contact</a>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        <Navigation/>
    </div>;
}