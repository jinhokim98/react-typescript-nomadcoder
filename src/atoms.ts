import { atom } from 'recoil'

interface IToDoState {
  [key: string]: string[]
}

const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    to_do: ['a', 'b'],
    doing: ['c', 'd', 'e'],
    done: ['f'],
  },
})

export default toDoState
