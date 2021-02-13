import React from 'react'
import PropTypes from 'prop-types'

function DataSelection({ setSelectedData }) {

  function changeSelectedData(event) {
    setSelectedData(event.target.name)
  }

  return (
    <div>
      Выберите набор данных
      <button type="button" name="small" onClick={changeSelectedData}> Маленький </button>
      <button type="button" name="large" onClick={changeSelectedData}> Большой </button>
    </div>
  )
}

DataSelection.propTypes = {
  setSelectedData: PropTypes.func.isRequired,
}

export default DataSelection
