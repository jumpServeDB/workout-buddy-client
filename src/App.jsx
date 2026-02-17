import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LogIn from "./pages/Login";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import AddWorkout from "./pages/AddWorkout";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter basename="/workout-buddy-client">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LogIn />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/new-workout"
              element={user ? <AddWorkout /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
