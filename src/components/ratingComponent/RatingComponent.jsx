import './ratingComponent.css'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const RatingComponent = ({rating}) => {
  return (
    
<div className='ratingBox'>
    <CircularProgressbar value={rating} text={rating}   maxValue={10}  styles={buildStyles({

        
        
        textSize: '24px',
        pathColor : rating > 8 ? 'green' : rating > 6 ? 'orange' :  'red'
    })}   ></CircularProgressbar>
</div>
  
  )
}

export default RatingComponent