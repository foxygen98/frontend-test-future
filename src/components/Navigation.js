import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Navigation.module.css'
import ChangePageButtons from './ChangePageButtons'

function Navigation({ numberOfPages, pageNumber, setPageNumber }) {

  function changePage(event) {
    if (event.type === 'keypress' && event.charCode === 13) {
      setPageNumber(Number(event.target.value))
      event.target.value = ''
    } else if (event.type === 'click') {
      setPageNumber(Number(event.target.name))
    }
  }

  return (
    <nav className={styles.NavigationBlock}>
      <button type="button" name="1" onClick={changePage} className={styles.MoveButton}> в начало </button>
      <ChangePageButtons numberOfPages={numberOfPages} pageNumber={pageNumber} changePage={changePage} />
      <button type="button" name={numberOfPages} onClick={changePage} className={styles.MoveButton}> в конец </button>
      <input type="text" placeholder="№" onKeyPress={changePage} className={styles.SearchPage} />
    </nav>
  )
}

Navigation.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
}

export default Navigation
