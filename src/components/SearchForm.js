import React from 'react'
import PropTypes from 'prop-types'

function SearchForm({ setSearchInput }) {

  function changeInputHandler(event) {
    setSearchInput(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="search" onChange={changeInputHandler} />
        <button type="submit">Найти</button>
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  setSearchInput: PropTypes.func.isRequired,
}

export default SearchForm
