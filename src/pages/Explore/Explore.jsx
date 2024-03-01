import "./explore.css";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../utils/api";
import { useState, useEffect } from "react";
import MediaCard from "../../components/mediaCard/MediaCard";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Filter from "../../components/filter/Filter";
import { useSelector } from "react-redux";
import {AiOutlineClose} from "react-icons/ai"
const Explore = () => {
  const params = useParams();
  const { genres } = useSelector((state) => state.home);
  const { category } = params;
  const [filterValue, setFilterValue] = useState("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  let genreQuery = "";

  const discoverMedia = async () => {
    setLoading(true);
    !!selectedGenres.length > 0 &&
      selectedGenres.forEach((g) => {
        genreQuery += `${g},`;
        // console.log(genreQuery);
      });

    const exploreData = await fetchApi(
      `/discover/${category}?page=1&sort_by=${filterValue}${
        genreQuery === "" ? "" : `&with_genres=${genreQuery}`
      }`
    );
    setData(exploreData);
    setLoading(false);
  };

  const getFilterValue = (filtValue) => {
    setFilterValue(filtValue);
  };
  const getGenreFilters = (filtValue) => {
    if(selectedGenres.indexOf(filtValue) === -1){
      setSelectedGenres((prevArr) => [...prevArr, filtValue]);
    }
    
  };
  const removeFilterCall = (idGenre)=>{
      console.log(idGenre)
   let getIndex =  selectedGenres.indexOf(idGenre);
   console.log(getIndex);
   selectedGenres.splice(getIndex,1);

    setSelectedGenres((prevArr)=>[...selectedGenres])
  }
  useEffect(() => {
    discoverMedia();
    // console.log(selectedGenres);
  }, [category, filterValue, selectedGenres]);

  return (
    <div className="mainExporePage">
      <ContentWrapper>
        <div className="filterContainer">
          <Filter value={getFilterValue} genreValue={getGenreFilters} />
          <div className="filtersSelected">
            {!!selectedGenres.length > 0 &&
              selectedGenres?.map((genreId, i) => (
                <>
                  <span key={i} className="selectedGenre">
                    {genres[genreId].name}
                    <span className="removeFilterButton" onClick={()=>{removeFilterCall(genreId)}}>
                      <AiOutlineClose />
                    </span>
                  </span>
                  
                </>
              ))}
          </div>
        </div>

        {loading ? (
          <div>Loading......</div>
        ) : (
          <div className="exporeSection">
            {!!data?.results && (
              <>
                {data?.results.map((item, i) => {
                  return <MediaCard key={i} data={item} />;
                })}
              </>
            )}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
