import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { categoryState, toDoState } from '../atoms'

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`

interface IForm {
  toDo: string
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>()
  const setToDos = useSetRecoilState(toDoState)
  const category = useRecoilValue(categoryState)

  const handleValid = (data: IForm) => {
    setToDos((prev) => [...prev, { text: data.toDo, category, id: Date.now() }])
    setValue('toDo', '') // 제출되면 값을 비운다.
  }
  return (
    <FormStyle onSubmit={handleSubmit(handleValid)}>
      <input {...register('toDo', { required: 'Please write a To do' })} placeholder="ToDo" />
      <button>Add</button>
    </FormStyle>
  )
}

export default CreateToDo
