import React, { useState } from 'react'
import '../styles/App.css'
import DataSelection from './DataSelection'
import UserCreationForm from './UserCreationForm'
import SearchForm from './SearchForm'
import Table from './Table.js'
import UserInformation from './UserInformation'

function App() {
  const [selectedData, setSelectedData] = useState('')
  const [selectedUser, setSelectedUser] = useState({
    address: {
      city: '',
      state: '',
      streetAddress: '',
      zip: '',
    },
    description: '',
    email: '',
    firstName: '',
    id: -1,
    lastName: '',
    phone: '',
  })

  if (!selectedData) {
    return (
      <div className="App">
        <DataSelection setSelectedData={setSelectedData} />
      </div>
    )
  }

  return (
    <div className="App">
      <DataSelection setSelectedData={setSelectedData} />
      <UserCreationForm />
      <SearchForm />
      <Table selectedData={selectedData} setSelectedUser={setSelectedUser} />
      <UserInformation selectedUser={selectedUser} />
    </div>
  )
}

export default App
