import { calcLevel, calculateAccuracy, calculateNewWords } from '../utils';
import ProgressBar from './ProgressBar'

export default function Stats(props) {
    const { name, day, attempts, PLAN } = props;
    
    // const name = 'Rohit'
    // const day = 16
    
    const currLevel = calcLevel(day)
    const flooredLevel = Math.floor(currLevel)
    const remainder = ( currLevel - flooredLevel) * 100

    return (
        <div className="card stats-card">
            <div className="welcome-text">
                <h6>Welcome</h6>
                <h4 className="text-large">
                    {name}
                </h4>
            </div>   

            <div className="stats-column">
                <div>
                    <p>Streak</p> 
                    <h4>{day - 1}</h4>
                </div>
                <div>
                    <p>Words Seen</p>
                    <h4>{calculateNewWords(day - 1)}</h4>
                </div>
                <div>
                    <p>Accuracy</p>
                    <h4>{(calculateAccuracy(attempts, day) * 100).toFixed(1)}</h4>
                </div>
            </div>  

            <ProgressBar text={`lvl ${flooredLevel}`} remainder={remainder} />
        </div>
    )
}