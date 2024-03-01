import { useState } from 'react'

import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import './trending.css'
import '../../../components/carousel/carousel.css'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carausel from '../../../components/carousel/Carausel'
import useFetch from '../../../hooks/useFetch';



const Trending = () => {



  const [endPoint,setEndPoint]  = useState("day")


  const onTabChange = (tab)=>{

    tab === 'day' ? setEndPoint('day')  : setEndPoint('week') 


  }

  const {data,loading}  =useFetch(`/trending/all/${endPoint}`)

 

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className='caraouselArea'>
          <div className="caraouselTitle">
            Trending
            </div>
            <SwitchTabs  data = {["day","week"]}  onTabChange = {onTabChange} />
          </div>
          { loading ? (
                <div>
                <div>loading...</div>
                </div>
              ): (
                <Carausel  data = {data?.results}  loading = {loading} endpoint={endPoint}  cls={"trending"}/>
              )
          }
        </ContentWrapper>
    </div>
  )
}

export default Trending