import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Table.module.css'
import TableHeader from './TableHeader'
import Navigation from './Navigation'
import { ReactComponent as LoadingIcon } from '../icons/loading-icon.svg'
import { SMALL_DATA_URL, LARGE_DATA_URL } from '../constants/urls'

function Table({ newUser, setNewUser, selectedData, setSelectedUser, searchInput }) {
  const [usersData, setUsersData] = useState(undefined)
  const [pageNumber, setPageNumber] = useState(1)
  const [sortableField, setSortableField] = useState('id')
  const [sortingDirection, setSortingDirection] = useState(1)
  const [filteredUsers, setFilteredUsers] = useState([])
  let url
  let shownUserList
  let numberOfPages

  if (selectedData === 'small') {
    url = SMALL_DATA_URL
  } else {
    url = LARGE_DATA_URL
  }

  useEffect(() => {
    setUsersData(undefined)
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        data.sort((prev, next) => prev.id - next.id)
        setUsersData(data)
      })
  }, [url])

  useEffect(() => {
    if (usersData && newUser.id !== -1) {
      setUsersData([newUser, ...usersData])
      setNewUser({
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
    }
  }, [newUser, usersData, setNewUser])

  useEffect(() => {
    if (usersData) {
      setFilteredUsers(filterUsers(searchInput, usersData))
    }
  }, [searchInput])

  function filterUsers(value, usersList) {
    // Не будем учитывать регистр
    value = value.toLowerCase()

    return usersList.filter(user => {
      for (const key in user) {
        // Исключаем из сравнения поле описания, так как оно не отображается в таблице
        if (String(user[key]).toLowerCase().includes(value) && key !== 'description') {
          return true
        }
      }
      return false
    })
  }

  function showInformationAboutUser(user) {
    setSelectedUser(user)
  }

  if (usersData) {
    if (searchInput && filteredUsers) {
      numberOfPages = Math.ceil(filteredUsers.length / 10)
      shownUserList = filteredUsers.slice((pageNumber - 1) * 10, pageNumber * 10)
    } else {
      numberOfPages = Math.ceil(usersData.length / 10)
      shownUserList = usersData.slice((pageNumber - 1) * 10, pageNumber * 10)
    }

    return (
      <section className={styles.Table}>
        <TableHeader 
          sortingDirection={sortingDirection}
          setSortingDirection={setSortingDirection}
          sortableField={sortableField}
          setSortableField={setSortableField}
          usersData={usersData}
          setUsersData={setUsersData}
        />
        {shownUserList
          .map(user => (
            <div 
              key={`${user.id} ${user.firstName}`}
              role="button"
              tabIndex={0}
              className={styles.TableRow}
              onClick={() => showInformationAboutUser(user)}
              onKeyDown={() => showInformationAboutUser(user)}
            >
              <div className={`${styles.Column} ${styles.id}`}>{user.id}</div>
              <div className={`${styles.Column} ${styles.firstName}`}>{user.firstName}</div>
              <div className={`${styles.Column} ${styles.lastName}`}>{user.lastName}</div>
              <div className={`${styles.Column} ${styles.email}`}>{user.email}</div>
              <div className={`${styles.Column} ${styles.phone}`}>{user.phone}</div>
            </div>
          ))
        }
        <Navigation numberOfPages={numberOfPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </section>
    )
  }

  return (
    <section>
      <LoadingIcon className={styles.LoadingIcon} />
    </section>
  )
}

Table.propTypes = {
  selectedData: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  newUser: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      streetAddress: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  setNewUser: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
}

export default Table
