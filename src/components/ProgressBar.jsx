import React from 'react'

export default function ProgressBar() {

  const text ='hello'
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  return (
    <div className='level'>
        <div>
          <h4>{text}</h4>
        </div>
      
      {arr.map((element, elementIndex) => {
        return (
          <div className='level-bar' key={elementIndex}></div> 
        )
      })}

      <div className='xp' style={{width: `${80}%`}}></div>
    </div>
    
  )
}
