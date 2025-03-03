import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../service/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetInput = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });

    if (res.token) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
      resetInput();
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default Login;
