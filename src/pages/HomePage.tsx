import { useEffect, useState } from "react";
import {
    useLazyGetUserRepoesQuery,
    useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/useDebounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const debounced = useDebounce(search);
    const [dropdown, setDropdown] = useState(false);
    const { data, isLoading, isError } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true,
    });
    const [fetchUser, { data: repos, isLoading: areReposLoading }] =
        useLazyGetUserRepoesQuery();

    const clickHandler = (name: string) => {
        fetchUser(name);
        setDropdown(false);
    };

    useEffect(() => {
        //@ts-expect-error data length will never be undefined
        setDropdown(debounced.length > 3 && data?.length > 0);
    }, [data?.length, debounced]);
    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen gap-5 px-2">
            {isError && (
                <p className="text-center text-red-600">
                    Something went wrong...
                </p>
            )}

            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for GitHub username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {dropdown && (
                    <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white list-none overflow-y-scroll">
                        {isLoading && <p className="text-center">Loading...</p>}
                        {data?.map((user) => {
                            return (
                                <li
                                    key={user.id}
                                    className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                                    onClick={() => clickHandler(user.login)}
                                >
                                    {user.login}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className="container max-h-[250px] overflow-y-scroll border">
                {areReposLoading && (
                    <p className="text-center">Repos are loading...</p>
                )}
                {repos?.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
