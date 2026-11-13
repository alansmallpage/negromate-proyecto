/** -------------------------------------------------------------------
 * ============================================
 * Página de "Profile" (Login/Registro)
 * ============================================
 */

import { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";
import "@/css/pages/Profile.css";

const Profile = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <section className="u-section Profile">
      <div className="u-container Profile-container">
        {/* Pestañas para elegir entre iniciar sesión y crear una cuenta */}
        <div className="ToggleButtons Profile-toggleButtons">
          <button
            onClick={() => setShowLogin(true)}
            className={`ToggleButton ${showLogin ? "ToggleButton--active" : ""}`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className={`ToggleButton ${!showLogin ? "ToggleButton--active" : ""}`}
          >
            Registrarse
          </button>
        </div>
        {showLogin ? <Login /> : <Register />}
      </div>
    </section>
  );
};

export default Profile;
