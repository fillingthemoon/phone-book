import Contacts, { Contact } from './contacts'

async function getContacts() {
  const quantity = 10
  const res = await fetch(`https://fakerapi.it/api/v1/persons?_quantity=${quantity}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const resJson = await res.json()

  return resJson.data
}

export default async function Home() {
  const contacts: Contact[] = await getContacts()

  return (
    <main>
      <h1>Phone Book</h1>
      <Contacts contacts={contacts} />
    </main>
  )
}
