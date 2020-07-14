import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const App = (props) => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  useEffect(() => {
    const fun = () => axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
    fun()
  }, [])
  
  return(
    <div>
      filter: <input value={filter} onChange={e => setFilter(e.target.value)} />
      <Countries filter={filter} setFilter={setFilter} countries={countries} />
    </div>
  )
}

const Countries = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries.filter(
    c => c.name.toLowerCase().includes(filter.toLowerCase()))
  const filteredCount = filteredCountries.length

  return(
    <div>
      {
        filteredCount > 10 ? <p>too many countries</p>
        : filteredCount > 1 ? filteredCountries.map((c, i) =>
          <li key={i}>
            {c.name}
            <button onClick={() => setFilter(c.name)}>
              show
            </button>
          </li>)
        : filteredCount === 1 ? <CountryDetails country={filteredCountries[0]}/>
        : <p>no countries found</p>
      }
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ capitalWeather, setCapitalWeather ] = useState({})

  useEffect(() => {
    const fun = () => axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(res => setCapitalWeather(res.data))
    fun()
  }, [api_key, country.capital])

  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      {
        capitalWeather.current !== undefined
        ? <p>temperature: {capitalWeather.current.temperature}</p>
        : null
      }
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {
          country.languages.map((l, i) => <li key={i}>{l.name}</li>)
        }
      </ul>
      <img
        style={{height: 'auto', width: '50%', border: 'solid black 1px'}}
        src={country.flag}
        alt={`Flag of ${country.name}`}/>
    </div>
  )
}

export default App
