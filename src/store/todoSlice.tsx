import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface TodoState {
  todos: string[]
}

const initialState: TodoState = {
  todos: []
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload)
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1)
    }
  }
})

export const { addTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
