// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CartPage from "./pages/CartPage/CartPage";
import ClothingItemDetailsPage from "./pages/ClothingItemDetailsPage/ClothingItemDetailsPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import AdminPage from "./pages/AdminPage/AdminPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<PrivateRoute> <CartPage /> </PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clothing_item/:item_id" element={<ClothingItemDetailsPage />} />
        <Route path="/review/:item_id" element={<ReviewPage />} />
        <Route path="/question/:item_id" element={<PrivateRoute> <QuestionPage /> </PrivateRoute>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
