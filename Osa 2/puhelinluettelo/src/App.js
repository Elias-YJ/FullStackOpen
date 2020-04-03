import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'

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

const Persons = ({persons, deleteHandler}) => {
  const personById = id => {
    return (persons.filter(person => person.id === id)[0])
  }
  const buttonHandler= id => {
    if(window.confirm(`Delete ${personById(id).name} ?`)){
      deleteHandler(id)
    }
  }
  return (
    <div>
      {persons.map(person =>
        <div 
          key={person.name}>{person.name} {person.number}
          <button onClick={() => buttonHandler(person.id)}>delete</button>
        </div>
      )}
    </div>    
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

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
    const duplicates = persons.filter(person => person.name===newName)
    if(duplicates.length>0){
      if(window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)){
        numberService
          .update(duplicates[0].id, {...duplicates[0], number: newNumber})
          .then(returnedInfo => {
            setPersons(persons.map(person => person.id !== duplicates[0].id ? person : returnedInfo))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      numberService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })
    }    
  }
  
  const handleDeletePerson = id => {
    numberService
    .remove(id)
    .then(result => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      const removedPerson = persons.filter(person => person.id === id)[0]
      setPersons(persons.filter(person => person.id !== id))
      alert(
        `${removedPerson.name} was already deleted from the server`
      )
      
    })
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

      <Persons persons={namesToShow} deleteHandler={handleDeletePerson} />
    </div>
  )

}

export default App