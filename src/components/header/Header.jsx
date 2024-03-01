import "./header.css";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../../assets/movix-logo.svg";


const Header = () => {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [mobileHeader, setMobileHeader] = useState("");
  const [auth, setAuth] = useState("0");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const searchHandler = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearchBar(false);
      }, 400);
    }
  };

  const searchBarHandler = () => {
    setQuery("");
    setShowSearchBar(true);
    setMobileView(false);
  };

  const navHandler = (category) => {
    navigate(`/explore/${category}`);
    setMobileView(false);
  };

  const mobMenuHandler = () => {
    setMobileView(true);
    setShowSearchBar(false);
  };

  const takeHome = () => {
    navigate("/");
  };

  const closeSession = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser")
    navigate("/account/login");
  };
const goToAccount = ()=>{

  navigate("/account/you")
}
  useEffect(() => {
    setAuth(localStorage.getItem("userToken"));
    // console.log(auth["auth"])

  });

  // const loginModal = ()=>{
  //   setAccountModal(true)

  // }
  return (
    <div className={` header ${mobileView ? "mobHead" : "deskHead"}`}>
      <ContentWrapper>
        <div className="headerComponent">
          <div className="logo" onClick={takeHome}>
            <img src={logo} alt="" />
          </div>

          <ul className="headerMenu">
            <li
              className="menuItem login"
              onClick={() => {
                setAccountModal(!accountModal);
              }}
            >
              Account
              {accountModal && (
                <ul className="logModal">
                  <li className="accountButton">
                    {localStorage.getItem("userToken") ? (
                      <div>
                        <button onClick={closeSession} className="logOut">
                          Log out
                        </button>
                        {
                            window.location.href.indexOf("you") > -1 ? "" :  <button  onClick={goToAccount}  className="goAcc">
                            Go to account
                          </button>
                        }
                       
                      </div>
                    ) : (
                      <div className="signLog">
                        <button
                          onClick={() => {
                            navigate("/account/login");
                          }}
                        >
                          Login
                        </button>
                        <button
                          onClick={() => {
                            navigate("/account/register");
                          }}
                        >
                          Sign up
                        </button>
                      </div>
                    )}
                    {/* <div>
                      <button onClick={closeSession} className="logOut">
                        Log out
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          navigate("/account/login");
                        }}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/account/register");
                        }}
                      >
                        Sign up
                      </button>
                    </div> */}
                  </li>
                </ul>
              )}
            </li>
            <li
              className="menuItem menu-movie"
              onClick={() => navHandler("movie")}
            >
              Movies
            </li>
            <li className="menuItem menu-tv" onClick={() => navHandler("tv")}>
              TV Shows
            </li>
            <li
              className="menuItem desksearchTrigger"
              onClick={searchBarHandler}
            >
              <AiOutlineSearch />
            </li>
          </ul>

          <div className="mobileMenu">
            <div className="mobSearchBarBtn" onClick={searchBarHandler}>
              <AiOutlineSearch />
            </div>
            {!mobileView ? (
              <div className="mobMenuTrigger" onClick={mobMenuHandler}>
                <GiHamburgerMenu />
              </div>
            ) : (
              <div
                className="mobSearchBarBtn"
                onClick={() => setMobileView(false)}
              >
                <AiOutlineCloseCircle />
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>

      {showSearchBar && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                value={query}
                onChange={handleChange}
                onKeyUp={searchHandler}
                placeholder="Search for a movie or a tv show...."
              />
              <div
                className="closeSearchBarBtn"
                onClick={() => setShowSearchBar(false)}
              >
                <AiOutlineCloseCircle />
              </div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Header;
