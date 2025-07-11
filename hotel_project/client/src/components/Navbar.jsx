import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Hotel", path: "/rooms" },
    { name: "Pengalaman", path: "/Experience" },
    { name: "Tentang", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") setIsScrolled(true);
    else setIsScrolled(false);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/backend/api/pengguna/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok && result.user) {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        setShowLogin(false);
        setForm({ email: "", password: "" });
      } else {
        alert(result.message || "Login gagal");
      }
    } catch (error) {
      alert("Gagal terhubung ke server");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 z-50 transition-all duration-500 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
      </Link>

      {/* Navigasi Desktop */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
            {link.name}
            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </Link>
        ))}
        {user?.role === "admin" && (
        <button onClick={() => navigate("/owner")} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? "text-black" : "text-white"}`}>
          Dasbor
        </button>
        )}
      </div>

      {/* Navigasi Kanan */}
      <div className="hidden md:flex items-center gap-4">
        <img src={assets.searchIcon} alt="cari" className={`${isScrolled && "invert"} h-7`} />
        {user ? (
          <>
            <span className="text-sm text-black font-medium">{user.username}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md">| Keluar</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)} className="bg-black text-white px-8 py-2.5 rounded-full ml-4">
            Masuk
          </button>
        )}
      </div>

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Masuk</button>
            </form>
            <button onClick={() => setShowLogin(false)} className="mt-4 text-sm text-gray-500 hover:underline">
              Batal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
