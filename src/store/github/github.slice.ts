import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    favourites: string[];
};

const initialState: InitialState = {
    favourites: JSON.parse(localStorage.getItem("favs")!) || [],
};

const gitHubSlice = createSlice({
    name: "github",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            state.favourites.push(action.payload);
            localStorage.setItem("favs", JSON.stringify(state.favourites));
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter(
                (fav) => fav !== action.payload
            );
            localStorage.setItem("favs", JSON.stringify(state.favourites));
        },
    },
});

export const { addFavorite, removeFavorite } = gitHubSlice.actions;
export default gitHubSlice.reducer;
