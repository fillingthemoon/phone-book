'use client'

import { useState, SetStateAction, Dispatch } from 'react'

import { useContactFormField } from './new-contact-form'

export interface Contact {
    id: number
    name: string
    phoneNumber: string
    address: string
}

interface ContactItemProps {
    contact: Contact
    contacts: Contact[]
    setContacts: Dispatch<SetStateAction<Contact[]>>
    currEditingContacts: number[]
    setCurrEditingContacts: Dispatch<SetStateAction<number[]>>
}

export default function ContactItem(props: ContactItemProps) {
    const { contact, contacts, setContacts, currEditingContacts, setCurrEditingContacts } = props

    const nameProps = useContactFormField(contact.name, null)
    const phoneNumberProps = useContactFormField(contact.phoneNumber, null)
    const addressProps = useContactFormField(contact.address, null)

    const contactFormFieldProps = [nameProps, phoneNumberProps, addressProps]

    const [editMode, setEditMode] = useState(false)


    const handleEnterEditingMode = () => {
        setEditMode(true)
        setCurrEditingContacts([
            ...currEditingContacts,
            contact.id,
        ])
    }

    const handleSave = () => {
        setEditMode(false)

        const indexOfCurrContact = contacts.findIndex(currContact => currContact.id === contact.id)

        const updatedContacts = contacts.toSpliced(indexOfCurrContact, 1, {
            id: contact.id,
            name: nameProps.value,
            phoneNumber: phoneNumberProps.value,
            address: addressProps.value,
        })

        setContacts(updatedContacts)
        window.localStorage.setItem('contacts', JSON.stringify(updatedContacts))

        const editingContactsIndexOfCurr = currEditingContacts.findIndex(currEditContId => currEditContId === contact.id)
        const updatedCurrEditingContacts = currEditingContacts.toSpliced(editingContactsIndexOfCurr, 1)
        setCurrEditingContacts(updatedCurrEditingContacts)
    }

    const handleDeleteContact = () => {
        const indexOfCurrContact = contacts.findIndex(currContact => currContact.id === contact.id)
        const updatedContacts = contacts.toSpliced(indexOfCurrContact, 1)
        setContacts(updatedContacts)
        window.localStorage.setItem('contacts', JSON.stringify(updatedContacts))
    }

    return (
        <div className="flex gap-4">
            {!editMode
                ? <>
                    <div>{contact.name}</div>
                    <div>{contact.phoneNumber}</div>
                    <div>{contact.address}</div>
                    <button
                        type="button"
                        onClick={() => handleEnterEditingMode()}
                    >Edit</button>
                    <button
                        type="button"
                        disabled={currEditingContacts.length > 0}
                        onClick={() => handleDeleteContact()}
                    >Delete</button>
                </>
                : <>
                    {contactFormFieldProps.map((formFieldProps, i) => {
                        const { reset, ...rest } = formFieldProps

                        return (
                            <input
                                key={i}
                                {...rest}
                            />
                        )
                    })}
                    <button type="button" onClick={handleSave}>Save</button>
                </>
            }
        </div>
    )
}