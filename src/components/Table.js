import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Table.module.css'
import TableHeader from './TableHeader'
import Navigation from './Navigation'
import { ReactComponent as LoadingIcon } from '../icons/loading-icon.svg'
import { SMALL_DATA_URL, LARGE_DATA_URL } from '../constants/urls'
import { USER_PROP_TYPE, USER_OBJECT } from '../constants/variables'

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
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        }
        return resp.json().then(err => {
          const error = new Error('Данные не были получены')
          error.data = err
          throw error
        })
      })
      .then(data => {
        data.sort((prev, next) => prev.id - next.id)
        setUsersData(data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }, [url])

  useEffect(() => {
    if (usersData && newUser.id !== -1) {
      setUsersData([newUser, ...usersData])
      setNewUser(USER_OBJECT)
    }
  }, [newUser, setNewUser, usersData])

  useEffect(() => {
    if (usersData) {
      setFilteredUsers(filterUsers(searchInput, usersData))
    }
  }, [searchInput, usersData])

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
    let users
    let setFunction

    if (searchInput && filteredUsers) {
      users = filteredUsers
      setFunction = setFilteredUsers
    } else {
      users = usersData
      setFunction = setUsersData
    }

    numberOfPages = Math.ceil(users.length / 15)
    shownUserList = users.slice((pageNumber - 1) * 15, pageNumber * 15)

    if (pageNumber > numberOfPages) {
      setPageNumber(numberOfPages)
    }

    return (
      <section className={styles.Table}>
        <TableHeader 
          sortingDirection={sortingDirection}
          setSortingDirection={setSortingDirection}
          sortableField={sortableField}
          setSortableField={setSortableField}
          usersData={users}
          setUsersData={setFunction}
        />
        {shownUserList
          .map(user => (
            <div 
              key={`${user.id} ${user.firstName} ${user.email}`}
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
  newUser: USER_PROP_TYPE.isRequired,
  setNewUser: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
}

export default Table
