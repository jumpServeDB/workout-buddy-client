import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);

  const handleClick = () => {
    logout();
    setBurgerIsOpen(false);
  };

  const toggleBurger = () => {
    setBurgerIsOpen(!burgerIsOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    console.log("resizing window");
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && width < 768 && !burgerIsOpen && (
            <img onClick={toggleBurger} src="/Hamburger_icon.svg" />
          )}
          {user && width > 768 && (
            <div className="nav-full-size">
              <div>{user.email}</div>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {user && width < 768 && burgerIsOpen && (
            <div className="burger-menu">
              <ul>
                <li onClick={toggleBurger}> Close X</li>
                <li>{user.email}</li>
                <li onClick={toggleBurger}>
                  <Link to="/">Workouts</Link>
                </li>
                <li onClick={toggleBurger}>
                  <Link to="/new-workout">New Workout</Link>
                </li>
                <li onClick={handleClick}>Log Out</li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
