import logo from './logo.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Add from './components/add'
import ShowJournals from './components/show'

function App() {
  return (
    <div className='App'>
      <Add />
      <ShowJournals />
    </div>
  )
}

export default App
