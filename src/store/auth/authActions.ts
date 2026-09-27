import { createAsyncThunk } from "@reduxjs/toolkit";

import { apolloClient } from "../../graphql/client";
import { LOGIN, REGISTER } from "../../graphql/mutations/auth";


type LoginInput = {
    email: string;
    password: string;
};

type RegisterInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export const login = createAsyncThunk(
    "auth/login",
    async (input: LoginInput) => {
        console.log(input);
        
        const { data } = await apolloClient.mutate({
            mutation: LOGIN,
            variables: {
                input,
            },
        });

        return data?.login;
    }
);


  
export const register = createAsyncThunk(
    "auth/register",
    async (input: RegisterInput) => {
        const { data } = await apolloClient.mutate({
            mutation: REGISTER,
            variables: {
                input,
            },
        });
  
        return data?.register;
    }
);