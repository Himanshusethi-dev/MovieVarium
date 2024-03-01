import "./mediaCard.css"
import noPoster  from "../../../assets/no-poster.png"
import { useSelector } from "react-redux"
const MediaCard = ({data}) => {

    const {url} = useSelector((state)=>state.home);
    // console.log(data)
  return (

    <>
    
    

    {!!data && (
            <div className="mediaCard">
                <div className="mediaCardTop">
                        <div className="posterImg">
                            <img src={data?.poster_path ? url?.poster + data?.poster_path : noPoster} alt="{data.title} " />
                        </div>
                        <div className="mediaName">
                            {data.title || data.name}
                        </div>
                </div>

               
            

            
            </div>
       
    )}
    </>
  )
  
}

export default MediaCard