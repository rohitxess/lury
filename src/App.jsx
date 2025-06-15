import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import Dashboard from "./components/layouts/Dashboard"
import Challenge from "./components/layouts/Challenge"
import { useState, useEffect } from "react"

import WORDS from './utils/VOCAB.json'
import { PLAN, countdownIn24Hours, getWordByIndex } from './utils'

function App() {
   // zero is for welcome, 1 is for dashboard and 2 is for challenege
   
   const [ selectedPage, setSelectedPage ] = useState(0)
   const [ name, setName ] = useState("")
   const [ day, setDay ] = useState(1)
   const [ datetime, setDatetime ] = useState(null)
   const [ history, setHistory ] = useState({})
   const [ attempts, setAttempts ] = useState(0)

  
   const daysWords = PLAN[day].map((idx) => {
      return getWordByIndex(WORDS, idx).word
      
   })
   console.log('from dayswords',daysWords)
   

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
      if (localStorage.getItem('attempts')){
         // then we found attempts
         setAttempts(parseInt(localStorage.getItem('attempts')))
   
      }

      if (localStorage.getItem('history')){
         // then we set we the state
         setHistory(JSON.parse(localStorage.getItem('history')))
      }

      // fix this later 
      
      if (localStorage.getItem('day')){
         const {day: d, datetime: dt}  = JSON.parse(localStorage.getItem('day'))

         setDatetime(dt)
         setDay(d)

         if (d > 1 && dt){
            const diff = countdownIn24Hours(dt) 
           
            if (diff < 0){
               // this means that the 24hrs has expired 
               let newHistory = {...history}
               const timestamp = new Date(dt)
               const formattedTimestamp = timestamp.toString().split(' ').slice(1,4).join(' ') 

               newHistory[formattedTimestamp] = d
               setHistory(newHistory)
               setDay(1)
               setDatetime(null)
               setAttempts(0)

               localStorage.setItem('attempts', 0)
               localStorage.setItem('history', JSON.stringify(newHistory))
               localStorage.setItem('day', JSON.stringify({
                  day: 1,
                  datetime: null 
               }))

            }
         }
      }

     

   }, [])


   const pages = {
      0: <Welcome handleCreateAccount={handleCreateAccount} name={name} setName={setName} />,
      1: <Dashboard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} handleChangePage={handleChangePage} daysWords={daysWords} datetime={datetime} />,
      2: <Challenge day={day} daysWords={daysWords} handleChangePage={handleChangePage} handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN}  />
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