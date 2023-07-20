import { configureStore } from "@reduxjs/toolkit";
import post from './redux'

export const store=configureStore({
    reducer:post
})