import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepo, IUser, ServerResponse } from "../../types";

export const gitHubApi = createApi({
    reducerPath: "github/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com/",
    }),
    refetchOnFocus: true,
    endpoints: (build) => ({
        searchUsers: build.query<IUser[], string>({
            query: (search: string) => ({
                url: "search/users",
                params: {
                    q: search,
                    per_page: 10,
                },
            }),
            transformResponse: (res: ServerResponse) => res.items,
        }),
        getUserRepoes: build.query<IRepo[], string>({
            query: (userName: string) => ({
                url: `users/${userName}/repos`,
            }),
        }),
    }),
});

export const { useSearchUsersQuery, useLazyGetUserRepoesQuery } = gitHubApi;
