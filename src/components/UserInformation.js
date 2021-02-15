import React from 'react'
import styles from '../styles/UserInformation.module.css'
import { USER_PROP_TYPE } from '../constants/variables'

function UserInformation({ selectedUser }) {
  return (
    <section className={styles.UserInformationBlock}>
      Выбран пользователь <b className={styles.Data}>{selectedUser.firstName} {selectedUser.lastName}</b>
      Описание:
      <textarea value={selectedUser.description} className={styles.TextAreaData} readOnly />
      Адрес проживания: <b className={styles.Data}>{selectedUser.address.streetAddress}</b>
      Город: <b className={styles.Data}>{selectedUser.address.city}</b>
      Провинция/штат: <b className={styles.Data}>{selectedUser.address.state}</b>
      Индекс: <b className={styles.Data}>{selectedUser.address.zip}</b>
    </section>
  )
}

UserInformation.propTypes = {
  selectedUser: USER_PROP_TYPE.isRequired,
}

export default UserInformation
