import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hooks/useFetch";
import './homeBanner.css'

const HomeBanner = () => {


  const [query,setQuery] = useState("")
  const [backgroundImg,setBackgroundImg] = useState("")
  const navigate = useNavigate();
  const sourceUrl = useSelector((state)=>state.home.url?.backdrop)
  const {data,loading}  =useFetch('/movie/upcoming')

      useEffect(()=>{

       const bg =    data?.results[Math.floor(Math.random() * 20)].backdrop_path

          const bgUrl  = sourceUrl + bg 

          setBackgroundImg(bgUrl);

        console.log(bgUrl)
      },[data])






        const handleChange = (e)=>{
           setQuery(e.target.value)
          
        }

        const searchHandler = (e)=>{

          console.log(e)

          if(e.key === 'Enter' || e.type === 'click'){
            navigate(`/search/${query}`)
          }
        }



  return (
    <div>
      <div className="wrapper homeBannerContainer">

        <div className="bannerBackdrop">
           {
                (!loading) &&
                      <div className="backDropImg">
                          <Img  src={backgroundImg} />
                      </div>

              }
        </div>
        

        <ContentWrapper>
          <div className="homeBannerContent">

                <div className="homeBannerTitle">
                  Welcome
                </div>
                <div className="homeBannerSubtitle">
                    Millions of movies, TV shows and people to discover. Explore now.
                </div>
                <div className="SearchFormBanner">
                  <input type="text" value={query} onChange={handleChange}  onKeyUp={searchHandler}  placeholder="Search for a movie or a tv show...." />
                  <button onClick={searchHandler} >Search</button>
                </div>
          </div>
        </ContentWrapper >
      </div>
    </div>
  )
}

export default HomeBanner