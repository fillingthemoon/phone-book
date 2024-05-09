'use client'

import { useState, useEffect, createContext, SetStateAction, Dispatch } from 'react';

import ContactItem, { Contact } from './contact-item'

interface EditContextType {
    currEditingContacts: number[]
    setCurrEditingContacts: Dispatch<SetStateAction<number[]>>
}

export const EditContext = createContext<EditContextType>({ currEditingContacts: [], setCurrEditingContacts: () => { } });

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
        <EditContext.Provider value={{ currEditingContacts, setCurrEditingContacts }}>
            <div className="flex flex-col">
                <button type="button" onClick={() => setNewContactForm(true)}>Add new contact</button>
                <input type="text" placeholder="Search for contact..." value={searchVal} onChange={(event) => setSearchVal(event.target.value)}></input>
                {contacts
                    .filter((contact: Contact) => contact.name.toUpperCase().includes(searchVal.toUpperCase()))
                    .map((contact: Contact, i: number) => (
                        <ContactItem key={contact.id + contact.name + i} contacts={contacts} setContacts={setContacts} contact={contact} />
                    ))}
                {newContactForm && <NewContactForm contacts={contacts} setContacts={setContacts} />}
            </div>
        </EditContext.Provider>
    )
}
