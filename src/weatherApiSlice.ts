import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

export interface Weather {
  number: number;
  min: number;
  max: number;
  desc: string;
  icon: string;
}
export interface WeatherApiState {
  weather: Weather | null;
  isLoading: boolean;
}
const initialState: WeatherApiState = {
  weather: null,
  isLoading: false,
};

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async() => {
  console.log("calling fetch api weather")  
  const response = await axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=36.7525&lon=3.0420&appid=23315ca86053bbde8d1b31e88845bb7e",
        /* {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }, */
      )
        const responseTemp = Math.round(response.data.main.temp - 273);
        const min = Math.round(response.data.main.temp_min - 273);
        const max = Math.round(response.data.main.temp_max - 273);
        const desc = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        console.log(response)
        //console.log(min, max, desc)
        //console.log(response.data)
        /* setTemp({
          number: responseTemp,
          min: min,
          max: max,
          desc: desc,
          icon: `https://openweathermap.org/payload/api/media/file/${icon}.png`,
        }); */
        return { number: responseTemp, min, max, desc, icon: `https://openweathermap.org/payload/api/media/file/${icon}.png`,
 }
})
const weatherApiSlice = createSlice({
    name: 'weatherApi',
    initialState ,
    reducers:{
        changeResult: (state) => {
            console.log("changed", state)
        }    },

        extraReducers: (builder) => {
          builder.addCase(fetchWeather.pending, (state, action) => {
            //console.log("received weatherApi/fetchWeather/pending")
            console.log("==========")
            console.log(state, action)
            state.isLoading = true
          }).addCase(fetchWeather.fulfilled, (state, action) => {
            console.log("******************")
            console.log(state, action)
            state.isLoading = false
            state.weather = action.payload
          }).addCase(fetchWeather.rejected, (state) => {
            state.isLoading = false
          })
        }
})

export const { changeResult } = weatherApiSlice.actions
export default weatherApiSlice.reducer
