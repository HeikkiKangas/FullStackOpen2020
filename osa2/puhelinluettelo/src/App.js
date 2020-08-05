import React, { useState, useEffect } from 'react'
import API from './API'

const Notification = ({ message}) =>
  message
  ? <div className='notification'>
      <h1>{message}</h1>
    </div>
  : null

  const Error = ({ message}) =>
  message
  ? <div className='error'>
      <h1>{message}</h1>
    </div>
  : null

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ name, setName ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ error, setError ] = useState('')

  const showNotification = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(''), 3000)
  }

  const showError = (error) => {
    setError(error)
    setTimeout(() => setError(''), 3000)
  }

  useEffect(() => {
    const fun = () => API.getAllEntries().then(res => setPersons(res.data))
    fun()
  }, [])

  const updatePerson = () => {
    if (window.confirm(`${name} is already in phonebook, replace old number with new one?`)) {
      const newPerson = {...persons.find(p => p.name === name), number}
      API.updateEntry(newPerson)
        .then(res => setPersons(persons.map(p => p.name !== name ? p : res.data)))
        .then(() => showNotification(`${name}'s number updated.`))
        .catch(() => showError(`Could not update ${name}'s number.`))
      setName('')
      setNumber('')
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    persons.filter(p => p.name === name).length > 0
      ? updatePerson()
      : addPerson()
  }

  const addPerson = () => {
    API.createEntry({ name, number })
      .then(res => setPersons(persons.concat(res.data)))
      .then(() => showNotification(`${name} added to phonebook.`))
      .catch(() => showError(`Could not add ${name} to phonebook.`))
    setName('')
    setNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Doy you want to delete ${person.name}?`))
    API.deleteEntry(person)
      .then(res => {
        if (res.statusText === 'OK') showNotification(`${person.name} removed from phonebook.`)})
      .catch(() => showError(`${person.name} has already been deleted.`))
    setPersons(persons.filter(p => p.id !== person.id))
  }

  const handleNameChange = event => setName(event.target.value)
  const handleNumberChange = event => setNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)

  return (
    <>
    <Notification message={message}/>
    <Error message={error}/>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <AddPersonForm
        handleSubmit={handleSubmit}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        newName={name}
        newNumber={number} />
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </>
  )
}

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter names: <input type='text' value={filter} onChange={handleFilterChange}/>
  </div>
)

const AddPersonForm = ({ handleSubmit, handleNumberChange,
  handleNameChange, newName, newNumber }) => (
  <div>
    <h2>Add person</h2>
    <form onSubmit={handleSubmit}>
      <div>
        name: <input type='text' value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input type='text' value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

const Persons = ({ persons, filter, deletePerson }) => (
  <div>
    <h2>Numbers</h2>
    <ul>
      {
        persons
          .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map((p, i) => <Person key={i} person={p} deletePerson={deletePerson}/>)
      }
    </ul>
  </div>
)

const Person = ({ person, deletePerson }) => (
  <li>
    { person.name } { person.number } <button onClick={() => deletePerson(person)}>Delete</button>
  </li>
)

export default App