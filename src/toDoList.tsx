import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`

interface IForm {
  email: string
  password: string
  password1: string
  extraError?: string
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: 'likelion@naver.com',
    },
  })

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      // 에러를 직접 넣어줄 수도 있다.
      setError('password1', { message: 'password are not the same' }, { shouldFocus: true })
    }
    // setError("extraError", {message: "Server offline"})
  }

  return (
    <div>
      <FormStyle onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', {
            required: 'password is required',
            minLength: { value: 10, message: 'too short' },
            pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: 'Only naver.com emails allowed' },
            validate: {
              noNico: (value) => (value.includes('nico') ? 'no nicos allowed' : true),
              noNick: (value) => (value.includes('nick') ? 'no nick allowed' : true),
            },
          })}
          placeholder="Email"
        />
        <input
          {...register('password', {
            required: 'password is required',
            minLength: { value: 10, message: 'too short' },
            pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: 'Only naver.com emails allowed' },
          })}
          placeholder="Password"
        />
        <input
          {...register('password1', {
            required: 'password is required',
            minLength: { value: 10, message: 'too short' },
            pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: 'Only naver.com emails allowed' },
          })}
          placeholder="Password1"
        />
        <span>{errors?.email?.message as string}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </FormStyle>
    </div>
  )
}

export default ToDoList
