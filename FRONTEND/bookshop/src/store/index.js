import {configureStore} from "@reduxjs/toolkit"
import authReucer from "./auth"
const store=configureStore({
    reducer:{
        auth:authReucer,
    },
})


export default store