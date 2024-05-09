"use client";

import { useState, SetStateAction, Dispatch } from "react";

import { Contact } from "./contact-item";

import {
  Flex,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const useContactFormField = (
  initialValue: string,
  placeholder: string | null
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: InputEvent) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange: handleChange,
    ...(placeholder && { placeholder }),
    reset,
  };
};

interface NewContactFormProps {
  contacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewContactForm(props: NewContactFormProps) {
  const { contacts, setContacts, isOpen, onClose } = props;

  const toast = useToast();

  const nameProps = useContactFormField("", "Name");
  const phoneNumberProps = useContactFormField("", "Phone number");
  const emailAddressProps = useContactFormField("", "Email address");
  const addressProps = useContactFormField("", "Address");

  const contactFormFieldProps = [
    nameProps,
    phoneNumberProps,
    emailAddressProps,
    addressProps,
  ];

  const handleSubmitForm = () => {
    if (nameProps.value !== "") {
      const updatedContacts = [
        ...contacts,
        {
          id: Math.max(...contacts.map((contact) => contact.id)) + 1,
          name: nameProps.value,
          phoneNumber: phoneNumberProps.value,
          emailAddress: emailAddressProps.value,
          address: addressProps.value,
        },
      ];

      setContacts(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      contactFormFieldProps.forEach((formFieldProps) => formFieldProps.reset());

      onClose();
    } else {
      toast({
        title: "Error",
        description: "The Name field cannot be left empty.",
        status: "error",
        duration: 4000,
        position: "top",
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={4}>
              {contactFormFieldProps.map((formFieldProps, i) => {
                const { reset, ...rest } = formFieldProps;

                return <Input key={i} {...rest} />;
              })}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSubmitForm}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
