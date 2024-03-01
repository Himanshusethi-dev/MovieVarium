import { useState } from 'react'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import '../../../components/carousel/carousel.css'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carausel from '../../../components/carousel/Carausel'
import useFetch from '../../../hooks/useFetch';

const TopRated = () => {


  const [endPoint,setEndPoint]  = useState("movie")

    const onTabChange = (tab)=>{
  
      tab === 'movies' ? setEndPoint('movie')  : setEndPoint('tv') 
  
  
    }
  
    const {data,loading}  = useFetch(`/${endPoint}/top_rated`)



  return (
    <div className="carouselSection">
    <ContentWrapper>
      <div className='caraouselArea'>
        <div className="caraouselTitle">
          Top Rated
          </div>
          <SwitchTabs  data = {["movies","tv shows"]}  onTabChange = {onTabChange} />
        </div>
        { loading ? (
              <div>
              <div>loading...</div>
              </div>
            ): (
              <Carausel  data = {data?.results}  loading = {loading} endPoint={endPoint} cls={"topRated"} />
            )

        }
      </ContentWrapper>
  </div>
  )
}

export default TopRated