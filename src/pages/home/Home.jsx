import HomeBanner from "./homeBanner/HomeBanner"
import Popular from "./popular/Popular"
import TopRated from "./topRated/TopRated"
import Trending from "./trending/Trending"

const Home = () => {
  return (
    <div>
      
      <HomeBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home