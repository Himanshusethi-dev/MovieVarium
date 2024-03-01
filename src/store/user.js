import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
const initialState = { 
    users : {

    }
   }
   const userBase = 'http://localhost:3000/account/'


   export const fetchUsers = createAsyncThunk(

    'users/getUserList',
    async () => {
        
        const {data} = await axios(userBase)
        return await data
    }


)
export const postWatchList = createAsyncThunk(


    'users/addToWatchList',
    async (userData)=>{
        let userID = userData.id;
        // userData = JSON.stringify(userData);
        const {watchArrData} = await axios.put(`${userBase}${userID}`,userData)
    }
)



export const usersSlice = createSlice({

    name:"users",
    initialState,
    reducers:{
    },
    extraReducers : (builder)=>{

        builder.addCase(fetchUsers.fulfilled,(state,action)=>{

            state.users = action.payload

        })
        .addCase(postWatchList.fulfilled,(state,action)=>{

            
        })
        
    

    }
})


// export const {} = usersSlice.actions

export default usersSlice.reducer