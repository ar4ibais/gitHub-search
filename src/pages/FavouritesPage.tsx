import { useAppSelector } from "../hooks/redux";

const FavouritesPage = () => {
    const favs = useAppSelector((state) => state.github.favourites);
    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen gap-5 px-2">
            {favs.length === 0 ? (
                <p>No favourites</p>
            ) : (
                <ul className="list-none">
                    {favs.map((f) => (
                        <li key={f}>
                            <a href={f} target="_blank">
                                {f}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavouritesPage;
