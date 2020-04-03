import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handler}) => {
  return (
    <form>
      <div>filter shown with<input value={filter} onChange={handler} /></div>
    </form>
  )
}

const InDepthCountry = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ weather, setWeather] = useState(
    {main: {temp: 274}, 
    weather:[{icon: '10d'}], 
    wind:{speed:0.0}})
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country, api_key])

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital} </div>
      <div>population {country.population} </div>
      <h3>languages</h3>
      <div>
        {country.languages.map(language =>
          <li key={language.iso639_1}>{language.name}</li>
        )}
      </div>
      <img src={country.flag} alt={`Flag of ${country.name}`} width={100} />
      <h3>Weather in {country.capital}</h3>
      <p><b>temperature: </b>{(weather.main.temp - 273.2).toFixed(1)} Celcius</p>
      <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='conditions' />
      <p><b>wind: </b>{(weather.wind.speed).toFixed(1)} m/s</p>
    </div>
  )
}

const ListOfCountries = ({countries, handler}) => {
  const handleButton = (element) => {
    handler(countries.find((country) => country.name===element.target.value))
  }
  return (
    <div>
      {countries.map(country =>
          <div key={country.name}>
            {country.name}
            <button value={country.name} onClick={handleButton}>show</button>
          </div>
      )}
    </div>
  )
}

const Countries = ({countries, handler}) => {
  if(countries.length>10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  }else if(countries.length>1){
    return(
      <ListOfCountries countries={countries} handler={handler} />
    )
  }else if(countries.length===1){
    return (
      <InDepthCountry country={countries[0]} />
    )
  } else {
    return (
      <div></div>
    )
  }
 
}

const App = () => {
  const [ allCountries, setAllCountries] = useState([])
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const nextFilter = event.target.value
    setNewFilter(nextFilter)
    setCountries(allCountries.filter(
                  country => country.name
                              .toLowerCase()
                              .includes(nextFilter.toLowerCase())))
  }

  const handleCountrySelect = (country) => {
    setCountries(new Array(country,))
  }
  
  return (
    <div>
      <Filter filter={newFilter} handler={handleFilterChange} />
      <Countries countries={countries} handler={handleCountrySelect} />
    </div>
  )

}

export default App
