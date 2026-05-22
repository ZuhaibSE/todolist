import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../types/user";

export default function LoginCard() {
  const navigate = useNavigate();

  const [form, setForm] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful 🚀");

      navigate("/todo");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow">

      <h2 className="text-2xl font-bold mb-4 text-center">
        Login
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mt-2"
        />

        <button className="bg-blue-600 text-white p-2 w-full mt-3">
          Login
        </button>
      </form>

      {/* 🔥 Signup Link */}
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-bold">
          Signup
        </Link>
      </p>
    </div>
  );
}