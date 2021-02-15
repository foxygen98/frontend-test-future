import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Table.module.css'
import { ReactComponent as DescendingSortIcon } from '../icons/descending-sort-icon.svg'
import { ReactComponent as AscendingSortIcon } from '../icons/ascending-sort-icon.svg'
import { USER_PROP_TYPE } from '../constants/variables'

function TableHeader({ sortingDirection, setSortingDirection, sortableField, setSortableField, usersData, setUsersData }) {
  const sortData = usersData

  function columnSort(event) {
    const { name } = event.target.dataset

    if (name && sortableField !== name) {
      setSortingDirection(1)
      setSortableField(name)
      sortData.sort((prev, next) => {
        if (prev[name] > next[name]) return 1
        return -1
      })
    } else {
      sortData.reverse()
      setSortingDirection(-sortingDirection)
    }
    setUsersData(sortData)
  }

  return (
    <div role="button" tabIndex={0} className={styles.TableRow} onClick={columnSort} onKeyDown={columnSort}>
      <Cell name='id' translation="id" sortableField={sortableField} sortingDirection={sortingDirection} />
      <Cell name='firstName' translation="имя" sortableField={sortableField} sortingDirection={sortingDirection} />
      <Cell name='lastName' translation="фамилия" sortableField={sortableField} sortingDirection={sortingDirection} />
      <Cell name='email' translation="электронная почта" sortableField={sortableField} sortingDirection={sortingDirection} />
      <Cell name='phone' translation="номер телефона" sortableField={sortableField} sortingDirection={sortingDirection} />
    </div>
  )
}

function Cell({ name, translation, sortableField, sortingDirection }) {
  return (
    <div className={`${styles.Column} ${styles[`${name}`]}`} data-name={name}>
      {translation}
      {sortableField === name && sortingDirection === 1 && <DescendingSortIcon className={styles.SortIcon} />}
      {sortableField === name && sortingDirection === -1 && <AscendingSortIcon className={styles.SortIcon} />}
    </div>
  )
}

Cell.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  sortableField: PropTypes.string.isRequired,
  sortingDirection: PropTypes.number.isRequired,
}

TableHeader.propTypes = {
  sortingDirection: PropTypes.number.isRequired,
  setSortingDirection: PropTypes.func.isRequired,
  usersData: PropTypes.arrayOf(USER_PROP_TYPE).isRequired,
  setUsersData: PropTypes.func.isRequired,
  sortableField: PropTypes.string.isRequired,
  setSortableField: PropTypes.func.isRequired,
}

export default TableHeader