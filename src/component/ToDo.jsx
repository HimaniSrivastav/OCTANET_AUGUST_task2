import React, {useEffect, useRef, useState} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from '../component/TodoItems'

function ToDo() {

  const[todoList, setTodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")) : []);

const inputRef = useRef();

const add = ()=>{
  const inputText = inputRef.current.value.trim();
  if(inputText === ""){
    return null;
  }

  const newTodo = {
    id: Date.now(),
    text: inputText,
    isComplete: false,
    }
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";

  
}
const deleteTodo = (id)=>{
  setTodoList((prvTodos)=>{
    return prvTodos.filter((todo) => todo.id !== id)
  })
}
const toggle = (id) => {
  setTodoList((prvTodos) => {
    return prvTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
  });
};
useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todoList));
}, [todoList])
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-2xl'>

       {/*----------------title----------------*/}

       <div className='flex items-center mt-5 gap-2'>
        <img className='w-8' src={todo_icon} alt="img here"/>
        <h1 className='text-3xl font-semibold'>To-do List</h1>
       </div>

       

       {/* -------------List Items----------------- */}

       <div>
        {todoList.map((item, index)=>{
          return <TodoItems key ={index} text ={item.text} id = {item.id} isComplete ={item.isComplete} deleteTodo={deleteTodo}  toggle={() => toggle(item.id)}/>

        })}
       </div>

       {/*--------------Input box---------------------*/}

       <div className='flex items-center my-7 bg-gray-200 rounded-full '>
        <input ref={inputRef} className='bg-transparent flex flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer '>ADD+</button>
       </div>


    </div>
  )
}

export default ToDo





