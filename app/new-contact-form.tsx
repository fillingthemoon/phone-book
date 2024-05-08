'use client'

import { useState, useContext } from 'react';

import { ContactContext } from './contacts'

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const useContactFormField = (initialValue: string, placeholder: string | null) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (event: InputEvent) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue("")
    }

    return {
        value,
        onChange: handleChange,
        ...(placeholder && { placeholder }),
        reset,
    }
}

export default function NewContactForm() {
    const nameProps = useContactFormField("", "name")
    const phoneNumberProps = useContactFormField("", "phoneNumber")
    const addressProps = useContactFormField("", "address")

    const contactFormFieldProps = [nameProps, phoneNumberProps, addressProps]

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

        contactFormFieldProps.forEach(formFieldProps => formFieldProps.reset())
    }

    return (
        <div className="flex flex-col">
            {contactFormFieldProps.map((formFieldProps, i) => {
                const { reset, ...rest } = formFieldProps

                return (
                    <input
                        key={i}
                        {...rest}
                    />
                )
            })}
            <button type="button" onClick={handleSubmitForm}>Submit</button>
        </div>
    )
}
