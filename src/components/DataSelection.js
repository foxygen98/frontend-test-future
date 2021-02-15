import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/DataSelection.module.css'

function DataSelection({ setSelectedData }) {

  function changeSelectedData(event) {
    if (event.target.type === 'button') {
      setSelectedData(event.target.name)

      if (event.target.name === 'small') {
        event.currentTarget.childNodes[0].classList.add(`${styles.Active}`)
        event.currentTarget.childNodes[1].classList.remove(`${styles.Active}`)
      } else {
        event.currentTarget.childNodes[1].classList.add(`${styles.Active}`)
        event.currentTarget.childNodes[0].classList.remove(`${styles.Active}`)
      }
    }
  }

  return (
    <div className={styles.DataSelectionBlock}>
      <p className={styles.Title}>Выберите набор данных</p>
      <div role="menu" tabIndex={0} className={styles.Menu} onClick={changeSelectedData} onKeyDown={changeSelectedData}>
        <button type="button" name="small" className={styles.Button}> Маленький </button>
        <button type="button" name="large" className={styles.Button}> Большой </button>
      </div>
    </div>
  )
}

DataSelection.propTypes = {
  setSelectedData: PropTypes.func.isRequired,
}

export default DataSelection
