import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAllEntries = () => axios.get(url)

const createEntry = (person) => axios.post(url, person)

const updateEntry = (person) => axios.put(`${url}/${person.id}`, person)

const deleteEntry = (person) => axios.delete(`${url}/${person.id}`)
// .then(res => res.headers.success)

export default {
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry
}