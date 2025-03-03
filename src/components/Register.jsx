import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../service/authService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser({ username, email, password });

    if (res.message === "User registered successfully") {
      navigate("/login");
    } else {
      alert(res.message || "Registration failed");
    }
  };

  return (
    <div>
      <div>Register</div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>password:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default Register;
