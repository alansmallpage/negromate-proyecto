/** -------------------------------------------------------------------
 * ============================================
 * Componente Principal de la App
 * ============================================
 */

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingPage from "@/pages/LandingPage";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Profile from "@/pages/Profile";
import GraphicDesign from "@/pages/GraphicDesign";
import CustomClothing from "@/pages/CustomClothing";
import Murals from "@/pages/Murals";
import ShoppingCart from "@/pages/ShoppingCart";
import NotFound from "@/pages/NotFound";
import MyOrders from "@/pages/MyOrders";
import AdminPanel from "@/pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "@/components/ScrollToTop";
import PageTitle from "@/components/PageTitle";
import "@/css/App.css";

function App() {
  return (
    <div className="App-container">
      {/* Scroll al cambiar de página (arriba o a la sección del #ancla) */}
      <ScrollToTop />
      {/* Título de la pestaña ("Negromate | Inicio"...) */}
      <PageTitle />
      <Header />
      <main className="App-mainContent">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/graphic-design" element={<GraphicDesign />} />
          <Route path="/custom-clothing" element={<CustomClothing />} />
          <Route path="/murals" element={<Murals />} />
          {/* Rutas para invitados */}
          <Route element={<GuestRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>
          {/* Rutas solo para administradores */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          {/* Cualquier otra dirección: página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* Notificaciones (react-hot-toast) */}
      <Toaster />
    </div>
  );
}

export default App;
