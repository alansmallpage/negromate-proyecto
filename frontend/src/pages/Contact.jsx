/** -------------------------------------------------------------------
 * ============================================
 * Página de Contacto "Contact"
 * ============================================
 */

import { useState } from "react";
import { api } from "@/services/api";
import "@/css/pages/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    tel: "",
    type: "private",
    info: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Guardar el mensaje en la base de datos
      await api.messages.create({
        name: formData.user,
        email: formData.email,
        phone: formData.tel,
        clientType: formData.type,
        message: formData.info,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err.message || "No se pudo enviar el mensaje. Inténtalo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };
  if (submitted) {
    return (
      <div className="u-messagePage">
        <div className="u-messageBox">
          <h2 className="Contact-successTitle">¡Gracias por tu mensaje!</h2>
          <p>Nos pondremos en contacto contigo lo antes posible.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="u-section Contact">
      <div className="u-container">
        <div className="Contact-header">
          <h1 className="Contact-title">Contacto</h1>
          <p className="Contact-subtitle">
            ¿Tienes un proyecto en mente? Ponte en contacto con nosotros.
          </p>
        </div>
        {/* Formulario de contacto */}
        <form onSubmit={handleSubmit} className="Contact-form">
          <div className="Form-group">
            <label htmlFor="user" className="Contact-label">
              Nombre / Empresa
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
              className="Contact-input"
            />
          </div>
          <div className="Form-group">
            <label htmlFor="email" className="Contact-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="Contact-input"
            />
          </div>
          <div className="Form-group">
            <label htmlFor="tel" className="Contact-label">
              Teléfono (Opcional)
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              className="Contact-input"
            />
          </div>
          {/* Botones para seleccionar tipo de cliente */}
          <fieldset>
            <legend className="Contact-legend">Tipo de cliente</legend>
            <div className="Contact-radioGroup">
              <label className="Contact-radioLabel">
                <input
                  id="private"
                  name="type"
                  type="radio"
                  value="private"
                  checked={formData.type === "private"}
                  onChange={handleChange}
                  className="Contact-radio"
                />
                <span>Particular</span>
              </label>
              <label className="Contact-radioLabel">
                <input
                  id="company"
                  name="type"
                  type="radio"
                  value="company"
                  checked={formData.type === "company"}
                  onChange={handleChange}
                  className="Contact-radio"
                />
                <span>Empresa</span>
              </label>
            </div>
          </fieldset>
          <div className="Form-group">
            <label htmlFor="info" className="Contact-label">
              Comentarios
            </label>
            <textarea
              id="info"
              name="info"
              rows="5"
              value={formData.info}
              onChange={handleChange}
              placeholder="Coméntanos brevemente sobre tu proyecto..."
              className="Contact-input Contact-textarea"
            ></textarea>
          </div>
          {/* Mensaje de error si el envío falla */}
          {error && <p className="u-errorMessage">{error}</p>}
          <button type="submit" disabled={loading} className="Button">
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
