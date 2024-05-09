'use client'

import { useState, SetStateAction, Dispatch } from 'react';

import { Contact } from './contact-item'

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

interface NewContactFormProps {
    contacts: Contact[]
    setContacts: Dispatch<SetStateAction<Contact[]>>
}

export default function NewContactForm(props: NewContactFormProps) {
    const { contacts, setContacts } = props

    const nameProps = useContactFormField("", "name")
    const phoneNumberProps = useContactFormField("", "phoneNumber")
    const addressProps = useContactFormField("", "address")

    const contactFormFieldProps = [nameProps, phoneNumberProps, addressProps]

    const handleSubmitForm = () => {
        const updatedContacts = [
            ...contacts,
            {
                id: Math.max(...contacts.map(contact => contact.id)) + 1,
                name: nameProps.value,
                phoneNumber: phoneNumberProps.value,
                address: addressProps.value,
            }
        ]

        setContacts(updatedContacts)
        localStorage.setItem('contacts', JSON.stringify(updatedContacts))

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
