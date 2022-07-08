import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ShowJournals() {
  const [journals, setJournals] = useState([])

  useEffect(() => {
   const getJournals = () => {
    axios.get('http://localhost:3001/get-all-journals').then(res =>{
     setJournals(res.data.document)
    })

    
   }
   getJournals()



   return;
  }, [journals])
const deleteJournals = (id) =>{
 axios.delete('http://localhost:3001/delete-journal', {data: {_id: id}})
 const getJournalsAgain = journals.filter( e => e._id !== id)
setJournals(getJournalsAgain)
}
  const ListJournals = () => {
   return journals.map(journal =>{
    return(
     <div key = {journal._id}>
      Title:
      <div> { journal.title } </div>
      Content:
     <div> { journal.content } </div>
     <button onClick={() => deleteJournals(journal._id)}> Delete </button>
     </div>
    )
   })
  }

  return(
   <div>
<ListJournals />
   </div>
  )
}
