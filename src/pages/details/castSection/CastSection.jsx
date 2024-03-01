import "./castSection.css";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import {useSelector } from "react-redux/es/hooks/useSelector";
import Img from "../../../components/lazyLoadImage/Img";
import noPosterImg from "../../../../assets/no-poster.png";
const CastSection = ({credits}) => {

   const {url} = useSelector((state)=> state.home)
    const cast = credits?.cast;
    const topCast = cast?.slice(0,6);
    
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="castMain">
          <div className="castHeading">Top Cast</div>

          {
            !!topCast && (

                <div className="castRow">

                {
                    topCast?.map((tc,i)=>(

                        <div key={i} className="castCard">
                            <div className="profileImg">
                                 <Img src={ tc.profile_path ? url.profile + tc.profile_path : noPosterImg } />

                            </div>

                            
                            <div className="castName">
                                {tc.name}
                            </div>
                            <div className="character">
                                {tc.character}
                            </div>
                        </div>


                    ))
                }
                </div>
            )
          }
        </div>
      </ContentWrapper>
    </div>
  );
};

export default CastSection;
