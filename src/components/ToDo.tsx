import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Categories, IToDo, toDoState } from '../atoms'

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((prev) => {
      const targetIdx = prev.findIndex((toDo) => toDo.id === id)
      const newToDo = { text, id, category: event.currentTarget.name as any }
      return [...prev.slice(0, targetIdx), newToDo, ...prev.slice(targetIdx + 1)]
    })
  }
  return (
    <li>
      {text}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          DONE
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          TO DO
        </button>
      )}
    </li>
  )
}

export default ToDo
