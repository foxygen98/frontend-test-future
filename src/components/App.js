import React, { useState } from 'react'
import styles from '../styles/App.module.css'
import DataSelection from './DataSelection'
import UserCreationForm from './UserCreationForm'
import SearchForm from './SearchForm'
import Table from './Table.js'
import UserInformation from './UserInformation'
import { USER_OBJECT } from '../constants/variables'

function App() {
  const [selectedData, setSelectedData] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [newUser, setNewUser] = useState(USER_OBJECT)
  const [selectedUser, setSelectedUser] = useState(USER_OBJECT)

  if (!selectedData) {
    return (
      <div>
        <DataSelection setSelectedData={setSelectedData} />
      </div>
    )
  }

  return (
    <div className={styles.AppContainer}>
      <DataSelection setSelectedData={setSelectedData} />
      <div className={styles.ContentContainer}>
        <div className={styles.ButtonAndForm}>
          <UserCreationForm setNewUser={setNewUser} />
          <SearchForm setSearchInput={setSearchInput} />
        </div>
        <Table 
          newUser={newUser}
          setNewUser={setNewUser}
          selectedData={selectedData}
          setSelectedUser={setSelectedUser}
          searchInput={searchInput}
        />
        <UserInformation selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default App
