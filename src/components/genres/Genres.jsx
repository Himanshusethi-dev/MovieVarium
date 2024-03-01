import { useSelector } from "react-redux/es/hooks/useSelector"
import './genres.css'
const Genres = ({data}) => {

    const {genres}  = useSelector(state=> state.home)
   
  return (
    <div className="genresContainer">
                {
                    // genres[12]?.name
                    

                    data?.slice(0,2).map((gnr)=>{

                        if(!genres[gnr]?.name) return
                        return(
                            <div className="genreItem" key={gnr}> {genres[gnr]?.name }</div>

                        )


                        })
                }
    </div>
  )
}

export default Genres