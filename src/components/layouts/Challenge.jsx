import ProgressBar from "../ProgressBar"

export default function Challenge() {
    const word = 'copa'
    const definiton = 'In order'
    return (
     <section id="challenge">
        <h1>{word}</h1>
        <p>{definiton}</p>
        <div className="helper">
            <div>
                {/* contains all the error correction bars  */}
                {/* ARRAY -> invoked function which creates an new array */}
                {/* if the definition is n characters long we want the array to be of n characters */}
                {/* create an array of length which matches the definition  */}
                {[...Array(definiton.length).keys()].map((element, elementIdx) => {
                    //determine whetherof not the user has typed the characted they think is correct, and show red or blue depending on whether or nor it is correct.
                    return (
                        <div key={elementIdx}>a</div>
                    )
                })}
            </div>
    
        
            <input type="text" />
            <div className="challenge-btns">
                <button className="card-button-secondary">
                    <h6>Quit</h6>
                </button>
                <button className="card-button-primary">
                    <h6>I forgot</h6>
                </button>
            </div>    
        </div>
        <ProgressBar />
     </section>
    )
}