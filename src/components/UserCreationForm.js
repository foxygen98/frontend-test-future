import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/UserCreationForm.module.css'

function UserCreationForm({ setNewUser }) {
  const [state, setState] = useState({
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      city: '',
      state: '',
      streetAddress: '',
      zip: '',
    },
    description: '',
  })

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
  }

  return (
    <div>
      <button type="button">
        Добавить
      </button>
      <form onSubmit={submitHandler}>
        <input 
          required
          type="number"
          name="id"
          placeholder="id"
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
          title="Введите номер телефона в формате (XXX)XXX-XXXX"
          className={styles.Input}
          onChange={changeInputHandler}
        />
        <button type="submit" className={styles.SubmitButton}>
          Добавить в таблицу
        </button>
      </form>
    </div>
  )
}

UserCreationForm.propTypes = {
  setNewUser: PropTypes.func.isRequired,
}

export default UserCreationForm
