
import { UserType } from './../../utilities/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface InitialStateAuthType {
    user: any,
    token: string
    isLogin: boolean,
    loading: boolean
    response: {
        statusCode: number,
        email: string
        error: string | undefined
    },
}

const initialStateAuth: InitialStateAuthType = {
    user: {},
    token: "",
    isLogin: false,
    loading: false,
    response: {
        statusCode: 400,
        email: "",
        error: undefined
    },
}

interface Register {
    email: string,
    password: string,
    name: string,
}

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.105:3000/',
    headers: {
        'Content-Type': 'application/json',
    }
})


export const register = createAsyncThunk(
    '/signup',
    async (data: Register) => {
        const res = await axiosInstance.post('signup', data);
        return res.data;
    })

export const login = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string, password: string }) => {
    console.log('login thunk called with:', email, password);
    const res = await axiosInstance.post('login', { email, password });
    console.log('login thunk response:', res.data);
    return res.data;
  }
);

      

const authSlice = createSlice({
    initialState: initialStateAuth,
    name: 'auth',
    reducers: {},
    extraReducers: (builder) => {
       

        //#region Register thunk
        builder.addCase(register.fulfilled, (state, action) => {
            console.log("Register fulfilled")
            state.response.email = action.payload.email
            state.response.statusCode = 200;
            state.loading = false;
        });
        builder.addCase(register.pending, (state, action) => {
            console.log("Register pending")
            state.loading = true;
        })
        builder.addCase(register.rejected, (state, action) => {
            console.log("Register rejected")
            state.response.statusCode = 400;
            state.loading = false;
            state.response.error = action.error.message;
        });
        //#endregion

        //#region Login thunk
        builder.addCase(login.fulfilled, (state, action) => {
            console.log("Login fulfilled");
            state.response.email = action.payload.email
            state.response.statusCode = 200;
            state.loading = false;
        });
        builder.addCase(login.pending, (state, action) => {
            console.log("Login pending");
            state.loading = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.response.statusCode = 400;
            state.loading = false;
            state.response.error = action.error.message;
        })
        //#endregion
    }

})

export default authSlice.reducer;