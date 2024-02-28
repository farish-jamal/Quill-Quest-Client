import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import NavBar from "../layout/NavBar";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const navigateTo = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await axios.post(
        `${baseUrl}/user/register`,
        {
          username,
          email,
          password,
          description,
          profilePicture,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const accessToken = user.data.sessionId;
      localStorage.setItem("accessToken", accessToken);
      navigateTo("/");
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <h3 className="text-center">Register Page</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter description"
              name="description"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              className="form-control"
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
