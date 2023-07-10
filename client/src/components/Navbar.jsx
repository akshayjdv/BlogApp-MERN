import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");

  // to navigate to login page without refresh button vali facility - akhu re render kre site and badhu update kre
  const navigate = useNavigate();

  // logout functionality mate logout function j data localstorage thi delete krse
  const logout = () => {
    // clears local storage by this func 
    localStorage.clear();
    alert("user logout successfully");
    navigate('/login');
  };
  
  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light "
          style={{ backgroundColor: "#e3f2fd" }}
        >
          {/* jo auth ma data hoi - mtlb user login che to ene logout dekhai nytar login dekhai */}

          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/navbar">
              Navbar
            </NavLink>

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {auth ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/blogs"
                      >
                        All Blogs
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/my-blogs">
                        My Blogs
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/create-blog">
                        Create Blog
                      </NavLink>
                    </li>
                    

                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/login"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout ({" "+ JSON.parse(auth).validUser.username})
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Register 
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      
    </>
  );
};

export default Navbar;

            // if want to apply search filter later on

            //   <form className="d-flex">
            //     <input
            //       className="form-control me-2"
            //       type="search"
            //       placeholder="Search"
            //       aria-label="Search"
            //     />
            //     <button className="btn btn-outline-success" type="submit">
            //       Search
            //     </button>
            //   </form>