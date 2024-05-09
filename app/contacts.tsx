'use client'

import { useState, useEffect } from 'react';

import {
    Flex,
    Container,
    Text,
    Input,
    Button,

    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,

    useDisclosure,

    Spinner,
} from '@chakra-ui/react'

import ContactItem, { Contact } from './contact-item'

import NewContactForm from './new-contact-form'
export default function Contacts() {
    const [searchVal, setSearchVal] = useState("")
    const [contacts, setContacts] = useState<Contact[] | null>(null)
    const [currEditingContacts, setCurrEditingContacts] = useState<number[]>([])

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const initialContacts = localStorage.getItem('contacts') || ''
        setContacts(initialContacts ? JSON.parse(initialContacts) : [])
    }, [])

    return (
        <Container maxW="container.xl" my={10}>
            <Flex flexDirection="column">
                <Text fontSize="3.5rem" fontWeight={700}>Phone book</Text>
                <Flex my={6} gap={4}>
                    <Input
                        maxW="400px"
                        type="text"
                        placeholder="Search for contact..."
                        value={searchVal}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => setSearchVal(event.currentTarget.value)}
                    />
                    <Button colorScheme="blue" onClick={onOpen}>Add contact</Button>
                    {contacts && <NewContactForm contacts={contacts} setContacts={setContacts} isOpen={isOpen} onClose={onClose} />}
                </Flex>
                {!contacts
                    ? <Flex my={10} flexDirection="column" alignItems="center" gap={6}>
                        <Spinner
                            thickness="4px"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                        <Text color="gray.400" fontSize="1.2rem" textAlign="center">Loading contacts, please wait...</Text>
                    </Flex>
                    : contacts.length > 0
                        ? <TableContainer whiteSpace="wrap">
                            <Table>
                                <Thead>
                                    <Tr>
                                        {Object.keys(contacts[0]).slice(1)
                                            .concat(['action'])
                                            .map((contactField, i) => (
                                                <Th key={contactField + i}>{contactField.replace(/([A-Z])/g, " $1")}</Th>
                                            ))}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {contacts
                                        .filter((contact: Contact) => contact.name.toUpperCase().includes(searchVal.toUpperCase()))
                                        .map((contact: Contact, i: number) => (
                                            <ContactItem
                                                key={contact.id + contact.name + i}
                                                contacts={contacts}
                                                setContacts={setContacts}
                                                contact={contact}
                                                currEditingContacts={currEditingContacts}
                                                setCurrEditingContacts={setCurrEditingContacts}
                                            />
                                        ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        : <>
                            <Text my={10} color="gray.400" fontSize="1.5rem" textAlign="center">Phone book is empty. Add contacts above.</Text>
                        </>
                }
            </Flex>
        </Container>
    )
}
