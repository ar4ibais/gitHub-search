import { configureStore } from "@reduxjs/toolkit";
import { gitHubApi } from "./github/github.api";
import github from "./github/github.slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    devTools: true,
    reducer: {
        [gitHubApi.reducerPath]: gitHubApi.reducer,
        github,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gitHubApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
