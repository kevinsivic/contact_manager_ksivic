import React, {useState} from "react"
import {post} from '@rails/request.js'
import {Link} from "react-router-dom";
import {Navigation} from "./Navigation";

export function CreateContact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    function onChange(event: React.ChangeEvent, setter: React.SetStateAction) {
        setter(event.target.value)
    }

    async function onSubmit(event: SubmitEvent) {
        event.preventDefault()

        const body = {
            "name": name,
            "email": email
        }

        const response = await post('/api/v1/contacts', {
            body: JSON.stringify(body)
        })

        if (response.ok) {
            setMessage("Contact successfully created!")
        } else {
            const json = await response.json
            setMessage("Contact could not be created: " + JSON.stringify(json))
        }
    }

    return <>
        <h1>
            Create a new Contact!
        </h1>
        <div className={"message"}>{message}</div>
        <form onSubmit={onSubmit}>
            <label htmlFor={"contactName"}>Name</label>
            <input type={"text"} name={"name"} id={"contactName"} required
                   onChange={(event: React.ChangeEvent) => onChange(event, setName)}/>
            <label htmlFor={"contactEmail"}>Email</label>
            <input type={"text"} name={"email"} id={"contactEmail"} required
                   onChange={(event: React.ChangeEvent) => onChange(event, setEmail)}/>
            <button type={"submit"}>Create Contact</button>
        </form>
        <Navigation />
    </>
}