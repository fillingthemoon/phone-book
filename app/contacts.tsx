'use client'

import { useState } from 'react';

import NewContactForm from './new-contact-form'

export interface Contact {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    birthday: string,
    gender: string,
    address: {
        id: number,
        street: string,
        streetName: string,
        buildingNumber: string,
        city: string,
        zipcode: string,
        country: string,
        county_code: string,
        latitude: number,
        longitude: number,
    },
    website: string,
    image: string,
}

interface ContactsProps {
    contacts: Contact[]
}

export default function Contacts(props: ContactsProps) {
    const { contacts } = props

    const [searchVal, setSearchVal] = useState("")
    const [newContactForm, setNewContactForm] = useState(false)

    return (
        <div className="flex-col">
            <button type="button" onClick={() => setNewContactForm(true)}>Add new contact</button>
            <input type="text" placeholder="Search for contact..." value={searchVal} onChange={(event) => setSearchVal(event.target.value)}></input>
            {contacts
                .filter((contact: Contact) => (
                    contact.firstname.toUpperCase().includes(searchVal.toUpperCase())
                    || searchVal.toUpperCase().includes(contact.firstname.toUpperCase()
                    )))
                .map((contact: Contact, i) => (
                    <div key={contact.firstname + i}>{contact.firstname}</div>
                ))}
            {newContactForm && <NewContactForm />}
        </div>
    )
}
