import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Navigation.module.css'

function ChangePageButtons({ numberOfPages, pageNumber, changePage }) {
  const pageButtons = Array(numberOfPages).fill(0).map((item, ind) => ind + 1)

  if (pageNumber <= 3 || numberOfPages <= 5) {
    return (
      <div className={styles.ButtonsContainer}>
        {pageButtons
          .slice(0, 5)
          .map(button => (
            <ChangePageButton key={button} button={button} pageNumber={pageNumber} changePage={changePage} />
          ))
        }
      </div>
    )
  }

  if (pageNumber > numberOfPages - 3) {
    return (
      <div className={styles.ButtonsContainer}>
        {pageButtons
          .slice(numberOfPages - 5, numberOfPages)
          .map(button => (
            <ChangePageButton key={button} button={button} pageNumber={pageNumber} changePage={changePage} />
          ))
        }
      </div>
    )
  }

  return (
    <div className={styles.ButtonsContainer}>
      {pageButtons
        .slice(pageNumber - 3, pageNumber + 2)
        .map(button => (
          <ChangePageButton key={button} button={button} pageNumber={pageNumber} changePage={changePage} />
        ))
      }
    </div>
  )
}

ChangePageButtons.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
}

function ChangePageButton({ button, pageNumber, changePage }) {
  return (
    <div>
      {pageNumber === button && <button type="button" name={button} className={styles.ButtonActive} onClick={changePage}>{button}</button>}
      {pageNumber !== button && <button type="button" name={button} className={styles.Button} onClick={changePage}>{button}</button>}
    </div>
  )
}

ChangePageButton.propTypes = {
  button: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
}

export default ChangePageButtons
