import Carausel from "../../../components/carousel/Carausel"
import useFetch from "../../../hooks/useFetch"
import { useParams } from "react-router-dom";
import "./recommendations.css"


const Recommendations = () => {
    
    const params = useParams();

    const { media_type, id } = params;

    const {data,loading} = useFetch(`/${media_type}/${id}/recommendations`)



  return (


            
                   <>


                    {
                        
                        !!data?.results.length > 0  && (

                            <div className="recommendations">
                                <Carausel  data={data?.results} loading={loading}  />
                            </div>

                        )
                     }
                   </> 

                    
            
            

    
    
  )
}

export default Recommendations