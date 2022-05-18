import { useState, useEffect  } from 'react'

import services from './services/numbers'

const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
      filter shown with: <input  value = {newFilter} onChange= {handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({addName,newName,handleChangeNam,newNumber,handleChangeNum}) => {
  return(
    <form onSubmit={addName}>
        <div>
          name: <input  value={newName} onChange={handleChangeNam}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({persons,newFilter,delPer}) => {
  return(
    <div>
    {
      persons.map((person) => {
        if(person.name.toLowerCase().includes(newFilter.toLowerCase()))
          return(
            <div>{person.name} {person.number} <button onClick={() => {delPer(person)}}>delete</button></div>
          )
        return
      })
    }
    </div>
  )
}

const Notification = ({message, flag}) => {
  if (message === null){
    return null
  }

  if (flag === true) {
    return(
      <div className='error'>
        {message}
      </div>
    )
  }

  return(
  <div className='msg'>
    {message}
  </div>
  )
  
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [error, setError] = useState(null)
  const [flag, setFlag] = useState(false)

  const hook = () =>{
    services.getAll()
      .then(data => setPersons(data))
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault();
    const name = {
      name: newName,
      number: newNumber,
      id : persons.length + 1
    }
    let check = false
    check = persons.every( (current) => current.name !== name.name)
    if(!check){
      if (window.confirm(`${name.name} is already added to phonebook, replace the old number with a new one?`)) {
        persons.forEach(prs => {
          if(name.name === prs.name)
            name.id = prs.id
        })
        services.update(name.id, name)
          .then(resp => {
            setPersons(persons.map(curr => curr.id === name.id ? resp : curr ))
            setFlag(false)
            setError(resp.name + ' Updated')

            setTimeout(() => {
              setError(null)
            }, 5000)
          }).catch(error => {
            setFlag(true)
            setError('Information of '+name.name+' had already removed from the server')
        
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
      }
      setNewNumber('');
      setNewName('');
      return
    }
  
    services.create(name)
    .then(response => {
      setPersons(persons.concat(response))
      setFlag(false)
      setError('Added '+ response.name)

      setTimeout(() => {
        setError(null)
      }, 5000)
    })
    setNewNumber('');
    setNewName('');
  }

  const delPer = prs => {
    if (window.confirm(`Delete ${prs.name}?`)) {
      services.erase(prs.id).then(response => {
        services.getAll().
          then(resp => {
            services.getAll()
            .then(resp => setPersons(resp))
          })
      })
    }
  } 

  const handleChangeNam = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNum = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm addName={addName} newName={newName} handleChangeNam = {handleChangeNam} newNumber ={newNumber} handleChangeNum={handleChangeNum}/>
      <Notification message={error} flag={flag}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter = {newFilter} delPer = {delPer}/>
    </div>
  )
}

export default App
