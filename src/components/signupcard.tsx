import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../types/user";

export default function SignupCard() {
  const navigate = useNavigate();

  const [form, setForm] = useState<User & { name: string }>({
    name: "",
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
      await API.post("/auth/signup", form);

      alert("Signup Successful 🎉");

      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* CARD */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-5 text-green-600">
          Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <button className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700">
            Signup
          </button>
        </form>

        {/* LOGIN BUTTON */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-bold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}