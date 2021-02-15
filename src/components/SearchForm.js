import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/SearchForm.module.css'

function SearchForm({ setSearchInput }) {
  const [searchString, setSearchString] = useState('')

  function changeInputHandler(event) {
    setSearchString(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault()
    setSearchInput(searchString)
  }

  return (
    <div className={styles.SearchContainer}>
      <form onSubmit={submitHandler}>
        <input type="search" placeholder="Начните ввод для поиска..." value={searchString} className={styles.SearchForm} onChange={changeInputHandler} />
        <button type="submit" className={styles.SearchButton}>Найти</button>
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  setSearchInput: PropTypes.func.isRequired,
}

export default SearchForm
