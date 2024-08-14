import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addFavorite, removeFavorite } from "../../store/github/github.slice";
import { IRepo } from "../../types";

const RepoCard = ({ repo }: { repo: IRepo }) => {
    const dispatch = useAppDispatch();
    const favs = useAppSelector((state) => state.github.favourites);
    return (
        <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank">
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p className="text-sm">
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">{repo?.description}</p>
            </a>
            {favs.includes(repo.html_url) ? (
                <button
                    className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
                    onClick={() => dispatch(removeFavorite(repo.html_url))}
                >
                    Remove from Favourites
                </button>
            ) : (
                <button
                    className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
                    onClick={() => dispatch(addFavorite(repo.html_url))}
                >
                    Add to Favourites
                </button>
            )}
        </div>
    );
};

export default RepoCard;
