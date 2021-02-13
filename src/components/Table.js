import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Table.module.css'
import Navigation from './Navigation'
import { SMALL_DATA_URL, LARGE_DATA_URL } from '../constants/urls'

function Table({ selectedData, setSelectedUser }) {
  const [usersData, setUsersData] = useState(undefined)
  const [pageNumber, setPageNumber] = useState(1)
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
      .then(data => setUsersData(data))
  }, [url])

  function showInformation(user) {
    setSelectedUser(user)
  }

  if (usersData) {
    numberOfPages = Math.ceil(usersData.length / 10)
    shownUserList = usersData.slice((pageNumber - 1) * 10, pageNumber * 10)

    return (
      <section className={styles.Table}>
        <TableOfContents />
        {shownUserList
          .map(user => (
            <div 
              key={user.id}
              data={user}
              role="button"
              tabIndex={0}
              className={styles.TableRow}
              onClick={() => showInformation(user)}
              onKeyDown={() => showInformation(user)}
            >
              <div className={styles.ColumnName}>{user.id}</div> 
              <div className={styles.ColumnName}>{user.firstName}</div>
              <div className={styles.ColumnName}>{user.lastName}</div>
              <div className={styles.ColumnName}>{user.email}</div>
              <div className={styles.ColumnName}>{user.phone}</div>
            </div>
          ))
        }
        <Navigation numberOfPages={numberOfPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </section>
    )
  }

  return (
    <section>
      loading...
    </section>
  )
}

function TableOfContents() {
  return (
    <div className={styles.TableRow}>
      <div className={styles.ColumnName}>id</div>
      <div className={styles.ColumnName}>имя</div>
      <div className={styles.ColumnName}>фамилия</div>
      <div className={styles.ColumnName}>email</div>
      <div className={styles.ColumnName}>телефон</div>
    </div>
  )
}

Table.propTypes = {
  selectedData: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
}

export default Table
