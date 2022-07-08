import React, { useState } from "react";
import axios from "axios";

// const app = () => {
//  console.log("hello")
// }

// export default app;
export default function Add() {
const [entry, setEntry] = useState({
 title: '',
 content: ''
})


const updateEntry = Entry => {
 return setEntry( prev => {
  return {...prev, ...Entry}
 })
}

const submitHandler = (e) => {
e.preventDefault();

const newEntry = {...entry}

axios.post('http://localhost:3001/add-journal', newEntry)

setEntry({title:'', content:''})
}

return (
  <div>
    <h2> Add a new Journal </h2>

    <form onSubmit={ submitHandler }>
      <label> Title </label>
      <textarea
        type='text'
        value={entry.title}
        onChange={(e) => updateEntry({ title: e.target.value })}
      />

      <label> Content </label>
      <textarea
        type='text'
        value={entry.content}
        onChange={(e) => updateEntry({ content: e.target.value })}
      />
      <button type='submit' vlaue='addjournal'> Submit </button>
    </form>
    
  </div>
)
}