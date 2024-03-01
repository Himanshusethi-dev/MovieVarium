import "./search.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchApi } from "../../utils/api";
import { useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MediaCard from "../../components/mediaCard/MediaCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { query } = params;

  const searchResultsInit = async () => {
    setLoading(true);
    const searchData = await fetchApi(
      `/search/multi?query=${query}&page=1`
    );
    setData(searchData);
    setLoading(false);
    setPage((prev)=>prev + 1);
  };

  const nextSearchResults = async () => {
    setLoading(true);
    const nextSearchData = await fetchApi(
      `/search/multi?query=${query}&page=${page}`
    );
    // setData(searchData);
    // console.log(nextSearchData);
    if (data.results) {
      const nextData = {
        ...data,
        results: [...data.results, ...nextSearchData.results],
      };
      setData(nextData);
      console.log(nextData);
    } else {
      setData(nextSearchData);
    }

    // console.log(data);
    setLoading(false);
    setPage((prev)=>prev + 1);

    // console.log(nextSearchData);
  };



  useEffect(() => {
  setPage(1);
   searchResultsInit();
  },[query]);

  return (
    <div className="searchPage">
      <ContentWrapper>
        {loading ? (
          <div>Loading.....</div>
        ) : (
          <div className="searchResultsContainer">
            {!!data?.results && (
              <>


                  <InfiniteScroll
                    dataLength={data?.results?.length}
                    next={nextSearchResults}
                    hasMore={page === data?.total_pages ? false : true}
                    loader={loading && <h4>Loading...</h4>}
                    scrollableTarget="searchResultsContainer"
                  >
                    {data.results.map((item, i) => (
                      <MediaCard key={i} data={item} />
                    ))}
                  </InfiniteScroll>
              </>
            )}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Search;
