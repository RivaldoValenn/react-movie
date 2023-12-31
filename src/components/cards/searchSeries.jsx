import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { searchTv } from "../../api/api";
import { useState } from "react";

const SearchSeries = () => {
  const [tvSearch, setSearchtv] = useState([]);
  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchTv(q);
      setSearchtv(query.results);
    } else {
      setSearchtv([]);
    }
  };
  return (
    <>
      <div className="search">
        <div className="container">
          <div className="container flex justify-center items-center mt-5">
            <section className="w-3/4 lg:w-full md:w-full mt-10">
              <div className="mb-5">
                <div className="relative mb-4 pt-10 flex w-full justify-center items-center">
                  <span
                    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    type="search"
                    className="relative m-0 block w-full md:w-1/2 rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search Series"
                    onChange={({ target }) => search(target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
          {tvSearch.length > 0 && (
            <p className="text-center my-8 text-white z-[999]">
              Search Result For "{tvSearch[0].name}"
            </p>
          )}

          <div className="container">
            <section className="trending-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-10">
              {tvSearch.map((movie) => (
                <div
                  className="card relative overflow-hidden rounded-lg shadow-lg bg-opacity-50 backdrop-blur-md transition duration-300 hover:scale-105 z-50"
                  key={movie.id}
                >
                  <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.name}
                    className="w-full h-full object-cover hover:brightness-50"
                    effect="blur"
                  />
                  <div className="card-desc absolute inset-0 flex flex-col justify-center items-center text-gray opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 bg-black bg-opacity-75">
                    <h3
                      className="text-slate-50 lg:text-xl md:text-sm text-center font-bold text-shadow-md"
                      style={{ textShadow: "3px 3px 5px #000000" }}
                    >
                      {movie.name}
                    </h3>
                    <p
                      className="text-slate-50 text-md md:text-sm text-center font-semibold text-shadow-md hidden md:block"
                      style={{ textShadow: "1px 1px 3px #000000" }}
                    >
                      {movie.overview}
                    </p>
                    <p
                      className="text-slate-50 text-sm text-center font-semibold text-shadow-md block md:hidden"
                      style={{ textShadow: "1px 1px 3px #000000" }}
                    >
                      {movie.overview}
                    </p>
                    <span
                      className="text-xl text-white mt-2 font-bold"
                      style={{ textShadow: "1px 1px 3px #000000" }}
                    >
                      <i className="bi bi-star-fill text-xl text-yellow-500"></i>{" "}
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSeries;
