/** -------------------------------------------------------------------
 * ============================================
 * API
 * ============================================
 */

const BASE_URL = import.meta.env.VITE_API_URL;

// Maneja las respuestas de la API
const handleResponse = async (response) => {
  let data = null;
  try {
    // Parsear la respuesta como JSON
    data = await response.json();
  } catch {
    // La respuesta no es JSON (por ejemplo, una página de error)
  }
  // Si la respuesta no fue exitosa, lanzamos un error con el mensaje de la API
  if (!response.ok || !data) {
    throw new Error(data?.msg || "Ha ocurrido un error. Inténtalo más tarde.");
  }
  return data;
};

// Realizar peticiones a la API
const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  // Si hay un token JWT, lo agregamos al header Authorization
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}/api/${endpoint}`, options);
  } catch (error) {
    // El servidor no responde (apagado o sin conexión)
    console.error("Error de conexión:", error);
    throw new Error("No se pudo conectar con el servidor. Inténtalo más tarde.");
  }
  return handleResponse(response);
};

// Servicios de la API organizados
export const api = {
  auth: {
    login: (credentials) => apiRequest("auth/login", "POST", credentials),
    register: (userData) => apiRequest("auth/register", "POST", userData),
  },
  products: {
    // Paquetes y galería de un servicio: "GraphicDesign", "CustomClothing" o "Murals"
    getWithGallery: (category) => apiRequest(`products/category/${category}`),
  },
  orders: {
    create: (orderData, token) => apiRequest("orders", "POST", orderData, token),
    getMyOrders: (token) => apiRequest("orders/myorders", "GET", null, token),
    // Solo admin
    getAll: (token) => apiRequest("orders", "GET", null, token),
    updateStatus: (id, status, token) =>
      apiRequest(`orders/${id}`, "PUT", { status }, token),
    delete: (id, token) => apiRequest(`orders/${id}`, "DELETE", null, token),
  },
  messages: {
    create: (messageData) => apiRequest("messages", "POST", messageData),
    // Solo admin
    getAll: (token) => apiRequest("messages", "GET", null, token),
    delete: (id, token) => apiRequest(`messages/${id}`, "DELETE", null, token),
  },
};
