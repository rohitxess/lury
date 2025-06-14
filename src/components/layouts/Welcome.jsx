
export default function Welcome(props) {
    // destructuring the props 
    // parent to child component 
    // when there is a change in the state the component is rerendered 
    
    const { name, setName, handleCreateAccount } = props
    
    return (
        <section id="welcome">
            <h3 className="text-large special-shadow">
                365 days.<br/>365 word.
            </h3> 
            <h6>Build you Lexicon. <br/> Start your callenge today!</h6>
            <div>
                <input value={name} type="text" placeholder="Enter your name" onChange={(e) => {
                    setName(e.target.value)
                }}/>
                <button disabled={!name} onClick={handleCreateAccount}>
                    <h6>Start&rarr;</h6>
                </button>
            </div>
        </section>
    )
}