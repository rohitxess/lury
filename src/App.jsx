import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import Dashboard from "./components/layouts/Dashboard"
import Challenge from "./components/layouts/Challenge"
import { useState, useEffect } from "react"

import WORDS from './utils/VOCAB.json'
import { PLAN, getWordByIndex } from './utils'

function App() {
   // zero is for welcome, 1 is for dashboard and 2 is for challenege
   
   const [ selectedPage, setSelectedPage ] = useState(0)
   const [ name, setName ] = useState("")
   const [ day, setDay ] = useState(1)
   const [ datetime, setDatetime ] = useState(null)
   const [ history, setHistory ] = useState([])
   const [ attempts, setAttempts ] = useState(0)

   const daysWords = PLAN[day].map((idx) => {
      return getWordByIndex(WORDS, idx)
      
   })
   console.log(daysWords)
   

   function handleChangePage(pageIndex){
      setSelectedPage(pageIndex)
   }

   function handleCreateAccount(){
      if (!name){
         return 
      }

      // store the data into local storage 

      localStorage.setItem('username', name)
      handleChangePage(1)
   }
   // listen to the lifecycle event 

   function handleCompleteDay(){
      const newDay = day + 1
      const newDateTime = Date.now()
      setDay(newDay)
      setDatetime(newDateTime)

      // store the day and time in local storage 
      // objects cannot be stored in json format hence we need to convert it into a string 

      localStorage.setItem('day', JSON.stringify({
         'day': newDay,
         'datetime': newDateTime
      }))

      setSelectedPage(1)
   }

   function handleIncrementAttempts(){
      // take the current attempt number, and add one and save it to local storage

      const newRecord = attempts + 1
      localStorage.setItem('attempts', newRecord)
      setAttempts(newRecord)
   }


   useEffect(() => {
      // this callback function is triggered when the page loads 
      // this is a guard clause, if the localstorage is empty then return 

      if (!localStorage){
         return
      }

      if(localStorage.getItem('username')){
         // if we find the item, then we enter the if block 
         setName(localStorage.getItem('username'))

         // if we have a name then we can skip to the dashboard without routing the the welcome page 

         setSelectedPage(1);
      }
   }, [])


   const pages = {
      0: <Welcome handleCreateAccount={handleCreateAccount} name={name} setName={setName} />,
      1: <Dashboard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} handleChangePage={handleChangePage} daysWords={daysWords} datetime={datetime} />,
      2: <Challenge day={day} daysWords={daysWords} handleChangePage={handleChangePage} hadleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN}  />
   }

   // use the functions to render the pages here 
   
  return (
     <Layout>
         {pages[selectedPage]}
     </Layout>
    
  ) 
}

export default App

// the layout is rendering 
// welcome and dashboard is wrapped inside the layout hence 
// they become the children and that is why it has to be passed as a children/prop to the layout 