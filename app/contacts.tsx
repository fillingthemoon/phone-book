'use client'

import { useState, createContext, SetStateAction, Dispatch } from 'react';

import ContactItem, { Contact } from './contact-item'

const defaultContacts: Contact[] = [

]

interface ContactContextType {
    contacts: Contact[]
    setContacts: Dispatch<SetStateAction<Contact[]>>
}

export const ContactContext = createContext<ContactContextType>({ contacts: defaultContacts, setContacts: () => { } });

import NewContactForm from './new-contact-form'
export default function Contacts() {
    const [searchVal, setSearchVal] = useState("")
    const [newContactForm, setNewContactForm] = useState(false)
    const [contacts, setContacts] = useState(defaultContacts)

    return (
        <ContactContext.Provider value={{ contacts: contacts, setContacts: setContacts }}>
            <div className="flex flex-col">
                <button type="button" onClick={() => setNewContactForm(true)}>Add new contact</button>
                <input type="text" placeholder="Search for contact..." value={searchVal} onChange={(event) => setSearchVal(event.target.value)}></input>
                {contacts
                    .filter((contact: Contact) => (
                        contact.name.toUpperCase().includes(searchVal.toUpperCase())
                        || searchVal.toUpperCase().includes(contact.name.toUpperCase()
                        )))
                    .map((contact: Contact, i) => (
                        <ContactItem key={contact.id + contact.name + i} contact={contact} />
                    ))}
                {newContactForm && <NewContactForm />}
            </div>
        </ContactContext.Provider>
    )
}
