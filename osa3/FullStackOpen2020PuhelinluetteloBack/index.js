const express = require('express')
const app = express()

const getRandomId = () => Math.floor(Math.random() * 1000000)

app.disable('etag')
app.use(express.json())

let people = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/info', (req, res) => res.send(`Phonebook has numbers for ${people.length} people<br>${new Date().toString()}`))

app.get('/api/persons', (req, res) => res.json(people))

app.get('/api/persons/:id', (req, res) => {
  const person = people.find(p => p.id === Number(req.params.id))
  person
    ? res.json(person)
    : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  people = people.filter(p => p.id !== Number(req.params.id))
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const newPerson = { ...req.body, id: getRandomId() }
  if (!newPerson.name) console.log('no-name')
  else if (!newPerson.number) console.log('no-number')
  else if (people.find(p => p.name === newPerson.name)) console.log('duplicate-name')
  else {
    people = people.concat(newPerson)
    res.json(newPerson)
    console.log('added-person', newPerson)
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
