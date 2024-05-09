'use client'

import { useState, useEffect } from 'react';

import ContactItem, { Contact } from './contact-item'

import NewContactForm from './new-contact-form'
export default function Contacts() {
    const [searchVal, setSearchVal] = useState("")
    const [newContactForm, setNewContactForm] = useState(false)
    const [contacts, setContacts] = useState<Contact[]>([])
    const [currEditingContacts, setCurrEditingContacts] = useState<number[]>([])

    useEffect(() => {
        const initialContacts = localStorage.getItem('contacts') || ''
        setContacts(initialContacts ? JSON.parse(initialContacts) : [])
    }, [])

    return (
        <div className="flex flex-col">
            <button type="button" onClick={() => setNewContactForm(true)}>Add new contact</button>
            <input
                type="text"
                placeholder="Search for contact..."
                value={searchVal}
                onChange={(event) => setSearchVal(event.target.value)}
            />
            {contacts
                .filter((contact: Contact) => contact.name.toUpperCase().includes(searchVal.toUpperCase()))
                .map((contact: Contact, i: number) => (
                    <ContactItem
                        key={contact.id + contact.name + i}
                        contacts={contacts}
                        setContacts={setContacts}
                        contact={contact}
                        currEditingContacts={currEditingContacts}
                        setCurrEditingContacts={setCurrEditingContacts}
                    />

                ))}
            {newContactForm && <NewContactForm contacts={contacts} setContacts={setContacts} />}
        </div>
    )
}
