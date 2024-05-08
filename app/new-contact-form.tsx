'use client'

import { useState } from 'react';

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
    const firstnameProps = useContactFormField("firstname")
    const lastnameProps = useContactFormField("lastname")
    const emailProps = useContactFormField("email")
    const phoneProps = useContactFormField("phone")
    const birthdayProps = useContactFormField("birthday")

    const contactFormFields = [firstnameProps, lastnameProps, emailProps, phoneProps, birthdayProps]

    return (
        <div className="flex-col">
            {contactFormFields.map((formField, i) => (
                <input
                    key={formField.placeholder + i}
                    {...formField}
                />
            ))}
        </div>
    )
}
