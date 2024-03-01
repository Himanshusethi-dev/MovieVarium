import axios from "axios";

const base_url =  'https://api.themoviedb.org/3'
const userBase = 'http://localhost:3000/account/'
// const tmdb_token = import.meta.env.VITE_APP_TMDB_TOKEN;


const headers  =  {

    Authorization: "bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzJlNDU1ODJkM2U1ZGY5NGUyZWZlYTlmMGQ3OTc5MyIsInN1YiI6IjY0YTMzMDIzZDQwMGYzMDBhZDg1Y2EyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ikHjq_oAX6ZeDjWzmfw-jWuyJXf90xxrFRBJw5XlRP0"
}

export const fetchApi = async (url,params)=>  {

try {

    const { data } = await axios.get(base_url + url,{

        headers,
        params
    })

    const result =  data;

    return result;
    
} catch (error) {

    return error
    
}
    


}

export const signUser = async (userData)=>{
    try{
        const { data } = await axios.post(userBase,userData);
        const result = data;
        return result;

        
    }catch(error){

        return error
    }


    
}

export const logUser = async (userData)=>{
    try{
        const { data } = await axios.post(userBase,userData);
        const result = data;
        return result;

        
    }catch(error){

        return error
    }


    
}