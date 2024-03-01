import "./filter.css";
import { useSelector } from "react-redux";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
const Filter = ({ value, genreValue }) => {
  const { genres } = useSelector((state) => state.home);
  const [show, setShow] = useState(false);
  const filterArr = [
    { label: "Popularity Descending", query: "popularity.desc" },
    { label: "Popularity Ascending", query: "popularity.asc" },
    { label: "Rating Ascending", query: "vote_average.asc" },
    { label: "Rating Descending", query: "vote_average.desc" },
  ];

  const genresArr = [];
  for (const g in genres) {
    genresArr.push(genres[g]);
  }
  const handleGenreFilter = () => {
    setShow(!show);
  };
  const selectGenres = (genre) => {
    genreValue(genre.g.id);
    setShow(!show);
  };
  const sortHandle = (e) => {
    value(e.value);
  };
  return (
    <div className="filterSection">
      <div className="sortby">
        <label htmlFor="sortByFilter">Sort By</label>
        <select
          name="Sort By"
          id="sortByFilter"
          onChange={(e) => {
            sortHandle(e.target);
          }}
        >
          {filterArr.map((filt, i) => (
            <>
              <option key={i} value={filt.query}>
                {filt.label}
              </option>
            </>
          ))}
        </select>
      </div>
      {!!genresArr && (
        <div className="genresFilter">
          <div className="genreSelector">
            <span className="filterLabel">Select Genres</span>
            <span className="dropdownArrow" onClick={handleGenreFilter}>
              <IoIosArrowDropdown />
            </span>
          </div>
          <ul className={`genresDropdown ${show ? " " : "hidden"}`}>
            {genresArr.map((g) => (
              <>
                <li
                  className="dropListItem"
                  onClick={() => {
                    selectGenres({ g });
                  }}
                >
                  {g.name}
                </li>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
