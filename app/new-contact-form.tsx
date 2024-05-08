'use client'

import { useState, useContext } from 'react';

import { ContactContext } from './contacts'

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const useContactFormField = (initialValue: string, placeholder: string | null) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (event: InputEvent) => {
        setValue(event.target.value)
    }

    return {
        value,
        onChange: handleChange,
        ...(placeholder && { placeholder })
    }
}

export default function NewContactForm() {
    const nameProps = useContactFormField("", "name")
    const phoneNumberProps = useContactFormField("", "phoneNumber")
    const addressProps = useContactFormField("", "address")

    const contactFormFields = [nameProps, phoneNumberProps, addressProps]

    const { contacts, setContacts } = useContext(ContactContext)

    const handleSubmitForm = () => {
        setContacts([
            ...contacts,
            {
                id: Math.max(...contacts.map(contact => contact.id)) + 1,
                name: nameProps.value,
                phoneNumber: phoneNumberProps.value,
                address: addressProps.value,
            }
        ])
    }

    return (
        <div className="flex flex-col">
            {contactFormFields.map((formField, i) => (
                <input
                    key={i}
                    {...formField}
                />
            ))}
            <button type="button" onClick={handleSubmitForm}>Submit</button>
        </div>
    )
}
