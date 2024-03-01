import React, { useEffect, useRef,useState } from "react";
import './carousel.css'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import noPosterImg  from '../../../assets/no-poster.png'
import Img from "../lazyLoadImage/Img";
import RatingComponent from "../ratingComponent/RatingComponent";
import Genres from "../genres/Genres";

const Carausel = ({data,loading,endPoint,cls}) => {
    const [hasImage,setHasImage] = useState(false)
    const navigate = useNavigate();
    const carouselContainer = useRef();
    const viewDetails = (id,media_type)=>{

        navigate(`/${media_type}/${id}`)
    }
    const checkImage = ()=>{
        
        data?.map((item)=>{

            if(item?.poster_path ){
                setHasImage(true)
                loading = false;
                
            }else{
                loading = true
            }
        })

    }
useEffect(()=>{


    checkImage()

})

    const carouselSlider = (dir,e)=>{
        e.preventDefault();
        
        console.log(e);

        const  carouselMainElem = carouselContainer.current;
        
            let scrollValue =   carouselMainElem.scrollLeft + carouselMainElem.offsetWidth;

            if(dir === 'right'){
                 scrollValue =   carouselMainElem.scrollLeft + (carouselMainElem.offsetWidth + 22);

            }else{
                console.log(carouselMainElem.scrollLeft)
                 scrollValue =   carouselMainElem.scrollLeft - (carouselMainElem.offsetWidth + 22);
            }
            carouselMainElem.scrollTo({
                left : scrollValue,
                behavior : "smooth"
                
            })

    }

    

    const {url} = useSelector((state)=> state.home)
    
  return (
       
            <ContentWrapper >
                <BsFillArrowLeftCircleFill  className={`carouselArrow left ${cls}`} onClick={(e)=>carouselSlider("left",e)}/>
                <BsFillArrowRightCircleFill className={`carouselArrow right ${cls}`} onClick={(e)=>carouselSlider("right",e)} />

                {
                    loading ? (
                        <div>
                            <div>loading...</div>
                        </div>
                    
                    ) : (

                        <div className={`carouselMain ${cls}`} ref={carouselContainer} >
                            {
                                data?.map((item,index)=>(

                                    <div key={index} className="itemCard">

                                        <div className="itemCardTop">

                                            <div className="itemPoster" onClick={()=>{(viewDetails(item?.id,item?.media_type || endPoint))}}>
                                                        <Img  alt="Poster"  src={ item?.poster_path ? url?.poster +  item?.poster_path : noPosterImg  }  />
                                              
                                            </div>

                                            <div className="itemCardOtherDetails">
{/* 
                                                    <div>
                                                        <RatingComponent  rating={item?.vote_average.toFixed(1)} />
                                                        <Genres   data={item?.genre_ids}  />
                                                    </div> */}
                                                    {      

                                                    hasImage ? ( <div>
                                                        <RatingComponent  rating={item?.vote_average.toFixed(1)} />
                                                        <Genres   data={item?.genre_ids}  />
                                                    </div>) : ( 
                                                        <div> </div>
                                                    )
                                                    
                                                    
                                                                
                                                    }
                                            </div>
                                        
                                        </div>
                                
                                        <div className="itemTitle">
                                            {item.title || item.original_name}
                                        </div>
                                    </div>


                            ))
                            }

                        </div>
                    )
                }
            
                
                
            </ContentWrapper>

            
        
  )
}

export default Carausel