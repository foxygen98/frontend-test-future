import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Navigation.module.css'

function ChangePageButtons({ numberOfPages, pageNumber, changePage }) {
  const pageButtons = Array(numberOfPages).fill(0).map((item, ind) => ind + 1)

  if (pageNumber <= 3 || numberOfPages <= 5) {
    return (
      <div>
        {pageButtons
          .slice(0, 5)
          .map(button => (
            <button key={button} type="button" name={button} className={styles.Button} onClick={changePage}>{button}</button>
          ))
        }
      </div>
    )
  }

  if (pageNumber > numberOfPages - 3) {
    return (
      <div>
        {pageButtons
          .slice(numberOfPages - 5, numberOfPages)
          .map(button => (
            <button key={button} type="button" name={button} className={styles.Button} onClick={changePage}>{button}</button>
          ))
        }
      </div>
    )
  }

  return (
    <div>
      {pageButtons
        .slice(pageNumber - 3, pageNumber + 2)
        .map(button => (
          <button key={button} type="button" name={button} className={styles.Button}  onClick={changePage}>{button}</button>
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

export default ChangePageButtons
