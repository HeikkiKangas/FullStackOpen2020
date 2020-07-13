import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() =>
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data)), [])

  const handleSubmit = event => {
    event.preventDefault()
    persons.filter(p => p.name.toLowerCase() === newName.toLowerCase()).length > 0
      ? alert(`name ${newName} is already in phonebook`)
      : addPerson()
  }

  const addPerson = () => {
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)

  return (
    <>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <AddPersonForm
        handleSubmit={handleSubmit}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
      />
      
      <Persons persons={persons} filter={filter} />
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

const Persons = ({ persons, filter }) => (
  <div>
    <h2>Numbers</h2>
    <ul>
      {
        persons
          .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map((p, i) => <Person key={i} person={p} />)
      }
    </ul>
  </div>
)

const Person = ({ person }) => (
  <li>
    { person.name } { person.number }
  </li>
)

export default App