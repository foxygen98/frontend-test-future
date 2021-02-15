import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/UserCreationForm.module.css'
import { USER_OBJECT } from '../constants/variables'

function UserCreationForm({ setNewUser }) {
  const [modalWindow, setModalWindow] = useState(false)
  const [state, setState] = useState(USER_OBJECT)

  function changeInputHandler(event) {
    event.persist()
    let { value } = event.target

    if (event.target.name === 'id') {
      value = Number(event.target.value)
    }

    setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: value,
      },
    }))
  }

  function submitHandler(event) {
    event.preventDefault()
    setNewUser(state)
    setModalWindow(false)
  }

  function closeModal(event) {
    if (event.target.dataset.name === 'modal') {
      setModalWindow(false)
    }
  }

  return (
    <div>
      <button type="button" className={styles.CreateButton} onClick={() => setModalWindow(true)}>
        Добавить
      </button>
      {modalWindow && 
        <div role="button" tabIndex={0} data-name="modal" className={styles.ModalWindow} onClick={closeModal} onKeyDown={closeModal}>
          <form onSubmit={submitHandler} className={styles.CreateUserForm}>
            <input 
              required
              type="text"
              name="id"
              placeholder="id"
              pattern="[0-9]{}"
              title="id может быть только положительным числом или 0"
              className={styles.Input}
              onChange={changeInputHandler}
            />
            <input 
              required
              type="text"
              name="firstName"
              placeholder="Имя"
              pattern="[A-Za-zА-Яа-яЁё]{2,}"
              title="Имя может содержать только буквы и должно быть длиннее 2 символов"
              className={styles.Input}
              onChange={changeInputHandler}
            />
            <input 
              required
              type="text"
              name="lastName"
              placeholder="Фамилия"
              pattern="[A-Za-zА-Яа-яЁё]{2,}"
              title="Фамилия может содержать только буквы и должна быть длиннее 2 символов"
              className={styles.Input}
              onChange={changeInputHandler}
            />
            <input 
              required
              type="email"
              name="email"
              placeholder="Электронная почта"
              className={styles.Input}
              onChange={changeInputHandler}
            />
            <input 
              required
              type="tel"
              name="phone"
              placeholder="Номер телефона"
              pattern="\(\d{3}\)\d{3}-\d{4}"
              maxLength="13"
              title="Введите номер телефона в формате (XXX)XXX-XXXX"
              className={styles.Input}
              onChange={changeInputHandler}
            />
            <button type="submit" className={styles.SubmitButton}>
              Добавить в таблицу
            </button>
          </form>
        </div>
      }
    </div>
  )
}

UserCreationForm.propTypes = {
  setNewUser: PropTypes.func.isRequired,
}

export default UserCreationForm
