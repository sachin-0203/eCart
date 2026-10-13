const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://ecart-xyss.onrender.com");

export default BACKEND_URL;