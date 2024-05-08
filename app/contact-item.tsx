'use client'

import { useState, useContext } from 'react'

import { EditContext, ContactContext } from './contacts'

import { useContactFormField } from './new-contact-form'

export interface Contact {
    id: number
    name: string
    phoneNumber: string
    address: string
}

interface ContactProps {
    contact: Contact
}

export default function ContactItem(props: ContactProps) {
    const { contact } = props

    const nameProps = useContactFormField(contact.name, null)
    const phoneNumberProps = useContactFormField(contact.phoneNumber, null)
    const addressProps = useContactFormField(contact.address, null)

    const contactFormFields = [nameProps, phoneNumberProps, addressProps]

    const { editContactId, setEditContactId } = useContext(EditContext)

    const { contacts, setContacts } = useContext(ContactContext)

    const handleSave = () => {
        setEditContactId(null)

        const indexOfCurrEdit = contacts.findIndex(currContact => currContact.id === contact.id)

        const updatedContacts = contacts.toSpliced(indexOfCurrEdit, 1, {
            id: contact.id,
            name: nameProps.value,
            phoneNumber: phoneNumberProps.value,
            address: addressProps.value,
        })

        setContacts(updatedContacts)
    }

    return (
        <div className="flex gap-4">
            {editContactId !== contact.id
                ? <>
                    <div>{contact.name}</div>
                    <div>{contact.phoneNumber}</div>
                    <div>{contact.address}</div>
                    <button type="button" onClick={() => setEditContactId(contact.id)} disabled={editContactId !== null && (contact.id !== editContactId)}>Edit</button>
                </>
                : <>
                    {contactFormFields.map((formField, i) => (
                        <input
                            key={i}
                            {...formField}
                        />
                    ))}
                    <button type="button" onClick={handleSave}>Save</button>
                </>
            }
        </div>
    )
}