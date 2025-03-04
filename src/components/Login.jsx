import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../service/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId);
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
