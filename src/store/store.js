import { configureStore } from "@reduxjs/toolkit"
import homeReducer  from './homeSlice'
import userReducer from './user'
const store = configureStore({
    reducer : {

        home : homeReducer,
        users : userReducer

    }
})


export default store;
