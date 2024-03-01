import "./details.css";
import DetailsBanner from "./DetailsBanner";
import CastSection from "./castSection/CastSection";
import Recommendations from "./recommendations/Recommendations";
import useFetch from "../../hooks/useFetch"; 
import { useParams } from "react-router-dom";

const Details = () => {
  const params = useParams();

  const { media_type, id } = params;

  const { data: credits, loading: creditLoading } = useFetch(
    `/${media_type}/${id}/credits`
  );
  return (
    <div className="detailsPage">

      <DetailsBanner credits={credits} />
      <CastSection credits={credits} />
      <Recommendations />
    

      
    </div>
  );
};

export default Details;
