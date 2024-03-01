import { useState } from 'react'
import './popular.css'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import '../../../components/carousel/carousel.css'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carausel from '../../../components/carousel/Carausel'
import useFetch from '../../../hooks/useFetch';

const Popular = () => {
     
    const [endPoint,setEndPoint]  = useState("movie")

    const onTabChange = (tab)=>{
  
      tab === 'movies' ? setEndPoint('movie')  : setEndPoint('tv') 
  
  
    }
  
    const {data,loading}  = useFetch(`/${endPoint}/popular`)



  return (
    <div className="carouselSection">
    <ContentWrapper>
      <div className='caraouselArea'>
        <div className="caraouselTitle">
          Popular
          </div>
          <SwitchTabs  data = {["movies","tv shows"]}  onTabChange = {onTabChange} cls={"popular"} />
        </div>
            { loading ? (

                    <div>
                    <div>loading...</div>
                    </div>
              ): (


                <Carausel  data = {data?.results}  loading = {loading} endPoint={endPoint}  cls={"popular"} />

              )
      
            }

      </ContentWrapper>
  </div>
  )
}

export default Popular