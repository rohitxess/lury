import { useState } from "react"
import ProgressBar from "../ProgressBar"
import { isEncountered, shuffle } from "../../utils"
import DEFINITIONS from "../../utils/VOCAB.json"

export default function Challenge(props) {

    const { day, daysWords, handleChangePage, handleIncrementAttempts, handleCompleteDay, PLAN } = props

    const [ wordIndex, setWordIndex ] = useState(0)
    const [ inputVal, setInputVal ] = useState('') 
    const [ showDefinition, setShowDefinition ] = useState(false)
    const [ listToLearn, setListToLearn ] = useState([
            ...daysWords,
            ...shuffle(daysWords),
            ...shuffle(daysWords),
            ...shuffle(daysWords),
        ])

    const word = listToLearn[wordIndex]
    console.log('from word', word)
    const isNewWord = showDefinition || (!isEncountered(day, word) && wordIndex < daysWords.length)
    
    const remainder = wordIndex * 100 /listToLearn.length


    function giveUp(){
        // if the user has forget the word then we add the word at the end of the list again 
        setListToLearn([...listToLearn], word)
        setShowDefinition(true)
    }
    // console.log(word)
    // const word = 'copa'
    const definition = DEFINITIONS[word]
    console.log('from defintion',definition)
    return (
     <section id="challenge">
        <h1>{word}</h1>
        {/* if isnewword is true then only show the word */}
       { isNewWord && (<p>{definition}</p>)}
        <div className="helper">
            <div>
                {/* contains all the error correction bars  */}
                {/* ARRAY -> invoked function which creates an new array */}
                {/* if the definition is n characters long we want the array to be of n characters */}
                {/* create an array of length which matches the definition  */}
                {[...Array(definition.length).keys()].map((char, elementIdx) => {
                    //determine whetherof not the user has typed the characted they think is correct, and show red or blue depending on whether or nor it is correct.

                    const styleToApply = inputVal.length < char + 1 ? '' : inputVal.split('')[elementIdx].toLowerCase() == definition.split('')[elementIdx].toLowerCase() ? 'correct' : 'incorrect'

                    return (
                        <div className={' ' + styleToApply} key={elementIdx}></div>
                    )
                })}
            </div>
    
        
            <input type="text" value={inputVal} placeholder="Enter the definition here" onChange={(e) => {
                // if a user has entered the correct number of characters, we need to do a few things 
                //1. if the entry is correct, we need to increment attempts and move htem on to the next word 
                // and entry is incorrect we need to increment attempst and also if they 

                if (e.target.value.length == definition.length && e.target.value.length > inputVal.length)
                {
                    // compare words 
                    
                    handleIncrementAttempts()

                    if (e.target.value.toLowerCase() ==  definition.toLowerCase()){
                        // then the user has the correct outcome 
                        if (wordIndex >= listToLearn.length - 1){
                            handleCompleteDay()
                            return 
                        }  

                        setWordIndex(wordIndex + 1)
                        setShowDefinition(false)
                        setInputVal('')
                        return 
                        // check if finished all the wrods, then end the day, otherwise 
                    }
                }
                
                setInputVal(e.target.value)
            }}/>
            <div className="challenge-btns">
                <button className="card-button-secondary" onClick={() => {
                    handleChangePage(1)
                }}>
                    <h6>Quit</h6>
                </button>
                <button className="card-button-primary" onClick={giveUp}>
                    <h6>I forgot</h6>
                </button>
            </div>    
        </div>
        <ProgressBar remainder={remainder} text={`${wordIndex} / ${listToLearn.length}`}/>
     </section>
    )
}