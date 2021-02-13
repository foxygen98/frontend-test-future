import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/UserInformation.module.css'

function UserInformation({ selectedUser }) {
  return (
    <section className={styles.UserInformationBlock}>
      Выбран пользователь <b>{selectedUser.firstName} {selectedUser.lastName}</b>
      Описание:
      <textarea value={selectedUser.description} readOnly />
      Адрес проживания: <b>{selectedUser.address.streetAddress}</b>
      Город: <b>{selectedUser.address.city}</b>
      Провинция/штат: <b>{selectedUser.address.state}</b>
      Индекс: <b>{selectedUser.address.zip}</b>
    </section>
  )
}

UserInformation.propTypes = {
  selectedUser: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      streetAddress: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserInformation
