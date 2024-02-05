'use client'

import { PageBlocksTodosList } from "@/tina/__generated__/types"
import { useEffect, useState } from "react"
import { tinaField } from "tinacms/dist/react"

export default function TodosList(props: PageBlocksTodosList) {
   const [todos, setTodos] = useState<Array<{
      userId: number,
      id: number,
      title: string,
      completed: boolean
    }>>([])

   useEffect(() => {
      const fetchTodos = async () => {
         const result = await fetch('https://jsonplaceholder.typicode.com/todos');
         const list = await result.json();
         setTodos(list)
      }

      fetchTodos()
   }, [])

   return (
      <div
         style={{
            height: 500,
            overflow: 'auto',
            border: '1px solid black',
            padding: '8px 16px',
            margin: 'auto'
         }}
         data-tina-field={tinaField(props)}
      >
         {todos.map((todo) => (
            <div key={todo.id}>
               <p style={{ color: 'red' }}>Title: {todo.title}</p>
               <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            </div>
         ))}
      </div>
   )
}