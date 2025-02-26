import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home
      <button onClick={() => navigate("/login")}>Login Page</button>
      <button onClick={() => navigate("/register")}>Register Page</button>
    </div>
  );
};

export default Home;
