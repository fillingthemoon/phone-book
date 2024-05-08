'use client'

import { useState, createContext, useContext, SetStateAction, Dispatch } from 'react';

export interface Contact {
    name: string,
    phoneNumber: string,
    address: string,
}

const defaultContacts: Contact[] = [
    { name: 'Bob', phoneNumber: '123', address: 'address1' },
    { name: 'Bob1', phoneNumber: '123', address: 'address1' },
    { name: 'Bob2', phoneNumber: '123', address: 'address1' },
    { name: 'Bob3', phoneNumber: '123', address: 'address1' },
    { name: 'Bob4', phoneNumber: '123', address: 'address1' },
    { name: 'Bob5', phoneNumber: '123', address: 'address1' },
    { name: 'Bob6', phoneNumber: '123', address: 'address1' },
]

interface GlobalContent {
    contacts: Contact[]
    setContacts: Dispatch<SetStateAction<Contact[]>>
}

export const AppContext = createContext<GlobalContent>({ contacts: defaultContacts, setContacts: () => { } });

import NewContactForm from './new-contact-form'
export default function Contacts() {
    const [searchVal, setSearchVal] = useState("")
    const [newContactForm, setNewContactForm] = useState(false)
    const [contacts, setContacts] = useState(defaultContacts)

    return (
        <AppContext.Provider value={{ contacts: contacts, setContacts: setContacts }}>
            <div className="flex flex-col">
                <button type="button" onClick={() => setNewContactForm(true)}>Add new contact</button>
                <input type="text" placeholder="Search for contact..." value={searchVal} onChange={(event) => setSearchVal(event.target.value)}></input>
                {contacts
                    .filter((contact: Contact) => (
                        contact.name.toUpperCase().includes(searchVal.toUpperCase())
                        || searchVal.toUpperCase().includes(contact.name.toUpperCase()
                        )))
                    .map((contact: Contact, i) => (
                        <div key={contact.name + i}>{contact.name}</div>
                    ))}
                {newContactForm && <NewContactForm />}
            </div>
        </AppContext.Provider>
    )
}
