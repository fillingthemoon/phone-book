'use client'

import { useState, useContext } from 'react';

import { AppContext } from './contacts'

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const useContactFormField = (placeholder: string) => {
    const [value, setValue] = useState("")

    const handleChange = (event: InputEvent) => {
        setValue(event.target.value)
    }

    return {
        value,
        placeholder,
        onChange: handleChange,
    }
}

export default function NewContactForm() {
    const nameProps = useContactFormField("name")
    const phoneNumberProps = useContactFormField("phoneNumber")
    const addressProps = useContactFormField("address")

    const contactFormFields = [nameProps, phoneNumberProps, addressProps]

    const { contacts, setContacts } = useContext(AppContext)

    const handleSubmitForm = () => {
        setContacts([
            ...contacts,
            {
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
                    key={formField.placeholder + i}
                    {...formField}
                />
            ))}
            <button type="button" onClick={handleSubmitForm}>Submit</button>
        </div>
    )
}
