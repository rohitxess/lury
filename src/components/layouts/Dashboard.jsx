import Stats from "../Stats";
import Countdown from "../Countdown";
import History from "../History";

export default function Dashboard(props) {  
  
    // we need to listen to the lifecycle event
  // it is not a good practice to pass props to too many components, hence we have used the spread operator 

    return (
        <section id="dashboard">
            <Stats {...props} />
            <Countdown {...props} />
            <History {...props}/>
        </section>
    )
}