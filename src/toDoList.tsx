import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import styled from 'styled-components'

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`

interface IForm {
  email: string
  password: string
  password1: string
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    defaultValues: {
      email: 'likelion@naver.com',
    },
  })

  const onValid = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <div>
      <FormStyle onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', {
            required: 'password is required',
            minLength: { value: 10, message: 'too short' },
            pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: 'Only naver.com emails allowed' },
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
        <button>Add</button>
        <span>{errors?.email?.message as string}</span>
      </FormStyle>
    </div>
  )
}

export default ToDoList
