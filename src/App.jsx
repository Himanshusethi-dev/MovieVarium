import { useEffect } from 'react'
import {BrowserRouter as Router,Route,Routes} from  'react-router-dom'
import {fetchApi} from  './utils/api.js'
import { getUrl,getGenres }  from './store/homeSlice.js'
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import Home from './Pages/home/Home.jsx';
import Header from './components/header/Header.jsx'
import Search from './pages/search/Search.jsx';
import Explore from './pages/Explore/Explore.jsx';
import './App.css'
import Details from './pages/details/Details.jsx';
import Account from './pages/account/Account.jsx'
import { fetchUsers } from './store/user.js'



function App() {

const dispatch = useDispatch();

  useEffect(()=>{
    getConfig();
    getGenresAll();
    getUserList();
  },[])


  const getUserList = async ()=>{

    let userList = dispatch(fetchUsers())


  }

const getConfig = async ()=>{

  const url = '/configuration';

 let data =  await fetchApi(url);

 const imageUrls = {

      backdrop : data.images?.secure_base_url + "original",
      poster : data.images?.secure_base_url + "original",
      profile : data.images?.secure_base_url + "original"
 }

 dispatch(getUrl(imageUrls))
}



const  getGenresAll = async ()=>{
  let movieGenresUrl = `/genre/movie/list`;
  let movieGenres = await fetchApi(movieGenresUrl);
  let stateGenres= {};

  
movieGenres?.genres?.map((genre)=>{

  stateGenres[genre.id] = genre; 


})

dispatch(getGenres(stateGenres))
   
}
  return (
    
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search/:query" element={<Search />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route path="/:media_type/:id" element={<Details />} />
          <Route path="/:media_type/:id" element={<Details />} />
          <Route path="/:media_type/:id" element={<Details />} />
          <Route path="/account/:operation" element={<Account />} />

          
          
        </Routes>
    </Router>
  
    
  )
}

export default App

