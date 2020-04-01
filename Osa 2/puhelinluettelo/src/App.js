import React, { useState } from 'react'

const Filter = ({filter, handler}) => {
  return (
    <form>
      <div>filter shown with<input value={filter} onChange={handler} /></div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>name: <input value={props.name} onChange={props.handleName}/></div>
      <div>number: <input value={props.number} onChange={props.handleNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>    
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'
    },
    { name: 'Erna Husko',
      number: '040-1236969'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const peopleNames = persons.map(person => person.name)
    if(peopleNames.indexOf(newName)>-1){
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={newFilter} handler={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={handleAddPerson}
        name={newName} handleName={handleNameChange}
        number={newNumber} handleNumber={handleNewNumber}
      />
    
      <h2>Numbers</h2>

      <Persons persons={namesToShow} />
    </div>
  )

}

export default App
