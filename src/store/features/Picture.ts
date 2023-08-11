import {ActionReducerMapBuilder, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BaseURL} from "../store";

export interface Photo {
    file: FormData
}

interface PictureState {
    photo: string
}

const pictureState: PictureState = {
    photo: ''
}
export const PictureSlice = createSlice({
    name: 'picture',
    initialState: pictureState,
    reducers: {
        clearPhoto:(state)=>{
            state.photo=''
        }
    },
    extraReducers:(builder: ActionReducerMapBuilder<PictureState>) => {
        builder.addCase(saveFile.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.photo=action.payload.data.data
        })
    }
})

export const saveFile = createAsyncThunk(
    "picture./file",
    async ({data, token}: { data: Photo, token: string }) => {
        const response = await axios({
                url: BaseURL+'/file',
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token
                },
                data: data.file
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)

export const {clearPhoto}=PictureSlice.actions