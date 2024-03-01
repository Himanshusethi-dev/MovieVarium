import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./details.css";
import { json, useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import noPosterImg from "../../../assets/no-poster.png";
import useFetch from "../../hooks/useFetch";
import RatingComponent from "../../components/ratingComponent/RatingComponent";
import Genres from "../../components/genres/Genres";
import { postWatchList } from "../../store/user";
import { useDispatch } from "react-redux";
const DetailsBanner = ({ credits }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { media_type, id } = params;
  // console.log({media_type,id})
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch(`/${media_type}/${id}`);

  const directors = credits?.crew.filter((cr) => {
    return cr.job === "Director";
  });
  const writers = credits?.crew.filter((cr) => {
    return cr.job === "Writer";
  });
  const genres = data?.genres?.map((gr) => {
    return gr.id;
  });

  const minutesToHours = (min) => {
    const hours = Math.floor(min / 60);
    const minutes = min - hours * 60;
    return `${hours}h  ${minutes}m`;
  };
// const watchArr = []
let userData = localStorage.getItem('currentUser')
userData = JSON.parse(userData)
let wObj = {...userData}
  const addToWatchList = (data)=>{

    // console.log(wObj);
    wObj.watchlist.push(data);
    localStorage.setItem('currentUser',JSON.stringify(wObj))
// let watchData = JSON.stringify(wObj)
 console.log(wObj);
    dispatch(postWatchList(wObj));

    // console.log(userData)

    
    
  }


  return (
    <>
      <div className="MovieDetailsBackdrop">
        <Img
          alt="MovieImage"
          src={
            data?.backdrop_path
              ? url.backdrop + data?.backdrop_path
              : noPosterImg
          }
        />
      </div>

      {loading ? (
        <div>Loading.....</div>
      ) : (
        <ContentWrapper>
          <div className="MovieDetailsMain">
            {!!data && (
              <>
                <div className="mediaPoster">
                  <Img
                    src={
                      data?.poster_path
                        ? url.backdrop + data?.poster_path
                        : noPosterImg
                    }
                  />
                </div>
                <div className="mediaAbout">
                  <div className="mediaDetails">
                    <h1 className="mediaTitle">{data.title || data.name}</h1>
                    <h2 className="tagline dimmed">{data.tagline}</h2>
                    <div className="mediaRating">
                      <RatingComponent rating={data?.vote_average.toFixed(1)} />
                    </div>

                    {!!genres && (
                      <div className="mediaGenre">
                        <Genres data={genres} />
                      </div>
                    )}

                    <div className="overview">
                      <div className="addWatch">
                        <button onClick={()=>{addToWatchList(data)}} className="watchListBtn">Add to Watchlist</button>
                      </div>
                      <div className="overviewHead">Overview</div>
                      <div className="overviewContent">{data.overview}</div>
                    </div>
                  </div>

                  <div className="mediaInfo">
                    {!!data.status && (
                      <div className="status">
                        <span>Status : </span>
                        <span className="dimmed">{data.status}</span>
                      </div>
                    )}

                    {!!data.release_date && (
                      <div className="releaseInfo">
                        <span>Release Date : </span>
                        <span className="dimmed">{data.release_date}</span>
                      </div>
                    )}
                    {!!data.runtime && (
                      <div className="status">
                        <span>Runtime : </span>
                        <span className="dimmed">
                          {minutesToHours(data.runtime)}
                        </span>
                      </div>
                    )}
                  </div>

                  {directors?.length > 0 && (
                    <div className="crewCast">
                      <span>Director : </span>
                      {directors?.map((drt, i) => (
                        <React.Fragment key={i}>
                          <span key={i}> {drt.name} </span>
                          {i !== directors.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {writers?.length > 0 && (
                    <div className="crewCast">
                      <span>Writer : </span>
                      {writers?.map((drt, i) => (
                        <React.Fragment key={i}>
                          <span> {drt.name} </span>
                          {i !== writers.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </ContentWrapper>
      )}
    </>
  );
};

export default DetailsBanner;
