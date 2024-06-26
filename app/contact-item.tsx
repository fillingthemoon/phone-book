"use client";

import { useState, SetStateAction, Dispatch } from "react";

import { useContactFormField } from "./new-contact-form";

import { Flex, Button, IconButton, Input, Tr, Td } from "@chakra-ui/react";

import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
}

interface ContactItemProps {
  contact: Contact;
  contacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  currEditingContacts: string[];
  setCurrEditingContacts: Dispatch<SetStateAction<string[]>>;
}

export default function ContactItem(props: ContactItemProps) {
  const {
    contact,
    contacts,
    setContacts,
    currEditingContacts,
    setCurrEditingContacts,
  } = props;

  const nameProps = useContactFormField(contact.name, null);
  const phoneNumberProps = useContactFormField(contact.phoneNumber, null);
  const emailAddressProps = useContactFormField(contact.emailAddress, null);
  const addressProps = useContactFormField(contact.address, null);

  const contactFormFieldProps = [
    nameProps,
    phoneNumberProps,
    emailAddressProps,
    addressProps,
  ];

  const [editMode, setEditMode] = useState(false);

  const handleEnterEditingMode = () => {
    setEditMode(true);
    setCurrEditingContacts([...currEditingContacts, contact.id]);
  };

  const handleSave = () => {
    setEditMode(false);

    const indexOfCurrContact = contacts.findIndex(
      (currContact) => currContact.id === contact.id
    );

    const updatedContacts = contacts.toSpliced(indexOfCurrContact, 1, {
      id: contact.id,
      name: nameProps.value,
      phoneNumber: phoneNumberProps.value,
      emailAddress: emailAddressProps.value,
      address: addressProps.value,
    });

    setContacts(updatedContacts);
    window.localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    const editingContactsIndexOfCurr = currEditingContacts.findIndex(
      (currEditContId) => currEditContId === contact.id
    );
    const updatedCurrEditingContacts = currEditingContacts.toSpliced(
      editingContactsIndexOfCurr,
      1
    );
    setCurrEditingContacts(updatedCurrEditingContacts);
  };

  const handleDeleteContact = () => {
    const indexOfCurrContact = contacts.findIndex(
      (currContact) => currContact.id === contact.id
    );
    const updatedContacts = contacts.toSpliced(indexOfCurrContact, 1);
    setContacts(updatedContacts);
    window.localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return !editMode ? (
    <Tr>
      {Object.keys(contact)
        .slice(1)
        .map((field: string, j: number) => (
          <Td key={field + j}>{contact[field as keyof Contact]}</Td>
        ))}
      <Td>
        <Flex gap={2}>
          <IconButton
            aria-label="Edit contact"
            colorScheme="blue"
            onClick={() => handleEnterEditingMode()}
            icon={<EditIcon />}
          />
          <IconButton
            aria-label="Delete contact"
            colorScheme="red"
            isDisabled={currEditingContacts.length > 0}
            onClick={() => handleDeleteContact()}
            icon={<DeleteIcon />}
          />
        </Flex>
      </Td>
    </Tr>
  ) : (
    <Tr>
      {contactFormFieldProps.map((formFieldProps, i) => {
        const { reset, ...rest } = formFieldProps;

        return (
          <Td key={i}>
            <Input {...rest} />
          </Td>
        );
      })}
      <Td>
        <Flex gap={2}>
          <IconButton
            aria-label="Save contact"
            colorScheme="green"
            onClick={() => handleSave()}
            icon={<CheckIcon />}
          />
        </Flex>
      </Td>
    </Tr>
  );
}
