import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workouts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    console.log("resizing window");
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
        {workouts === null && (
          <img src="/loading-spinner.png" className="loading-spinner" />
        )}

        {workouts && workouts.length === 0 ? (
          <div>Add some workouts to get started!</div>
        ) : (
          ""
        )}
      </div>
      {width > 768 && <WorkoutForm className="home-workout" />}
    </div>
  );
};

export default Home;
