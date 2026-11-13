/** -------------------------------------------------------------------
 * ============================================
 * MOCK DATA
 * ============================================
 */

export const mockData = {
  /** -------------------------------------------------------------------
   * ============================================
   * CATÁLOGO DE PRODUCTOS/SERVICIOS
   * ============================================
   */
  products: [
    // ============================================
    // CATEGORÍA: DISEÑO GRÁFICO
    // ============================================
    {
      category: "GraphicDesign",
      name: "Paquete Esencial de Marca",
      price: 250,
      imageUrl: "/images/pack-diseno-grafico.webp",
      description: "Ideal para startups y pequeños proyectos.",
      details: [
        "Diseño de logotipo principal",
        "Paleta de colores y tipografías",
        "2 rondas de revisión",
        "Archivos en formato vectorial y PNG",
      ],
    },
    {
      category: "GraphicDesign",
      name: "Paquete Identidad Corporativa",
      price: 500,
      imageUrl: "/images/pack-diseno-grafico.webp",
      description: "La solución completa para establecer tu marca.",
      details: [
        "Todo del Paquete Esencial",
        "Diseño de logotipo secundario y favicon",
        "Manual de marca básico (4 páginas)",
        "Diseño de tarjeta de visita",
        "4 rondas de revisión",
      ],
    },
    {
      category: "GraphicDesign",
      name: "Paquete Premium Total",
      price: 750,
      imageUrl: "/images/pack-diseno-grafico.webp",
      description: "Para marcas que buscan un impacto total y versatilidad.",
      details: [
        "Todo del Paquete Corporativo",
        "Manual de marca extendido (10+ páginas)",
        "Plantillas para redes sociales (3 posts, 1 story)",
        "Diseño de firma de email",
        "Revisiones ilimitadas por 2 semanas",
      ],
    },
    // ============================================
    // CATEGORÍA: ROPA PERSONALIZADA
    // ============================================
    {
      category: "CustomClothing",
      name: "Prenda Única",
      price: 50,
      imageUrl: "/images/pack-ropa-personalizada.webp",
      description: "Una camiseta o sudadera con un diseño exclusivo para ti.",
      details: [
        "1 prenda (camiseta o sudadera)",
        "Diseño personalizado (hasta 2 colores)",
        "Técnica de serigrafía o vinilo textil",
        "Asesoría de diseño incluida",
      ],
    },
    {
      category: "CustomClothing",
      name: "Pack Dúo Creativo",
      price: 100,
      imageUrl: "/images/pack-ropa-personalizada.webp",
      description:
        "Perfecto para parejas, amigos o para tener una de recambio.",
      details: [
        "2 prendas a elección",
        "Diseño complejo (hasta 4 colores)",
        "Técnicas mixtas (aerografía, serigrafía)",
        "Proceso colaborativo de diseño",
      ],
    },
    {
      category: "CustomClothing",
      name: "Colección Cápsula",
      price: 150,
      imageUrl: "/images/pack-ropa-personalizada.webp",
      description: "Lanza tu propia mini-colección con nuestra ayuda.",
      details: [
        "5 prendas (mix de camisetas/sudaderas)",
        "Conceptualización de la colección",
        "Diseños cohesivos para todas las prendas",
        "Etiquetado personalizado de la marca",
      ],
    },
    // ============================================
    // CATEGORÍA: MURALES
    // ============================================
    {
      category: "Murals",
      name: "Mural Interior Pequeño",
      price: 600,
      imageUrl: "/images/pack-murales.webp",
      description: "Dale vida a una pared de tu local u hogar (hasta 4m²).",
      details: [
        "Diseño y boceto digital",
        "Superficie hasta 4 metros cuadrados",
        "Pintura plástica y sprays de alta calidad",
        "Trabajo realizado en 1-2 días",
      ],
    },
    {
      category: "Murals",
      name: "Mural Mediano Impacto Visual",
      price: 850,
      imageUrl: "/images/pack-murales.webp",
      description:
        "Transforma un espacio comercial o una fachada (hasta 10m²).",
      details: [
        "Todo del Paquete Pequeño",
        "Superficie hasta 10 metros cuadrados",
        "Mayor complejidad y detalle en el diseño",
        "Barniz protector anti-graffiti y UV",
      ],
    },
    {
      category: "Murals",
      name: "Gran Formato Exterior",
      price: 1200,
      imageUrl: "/images/pack-murales.webp",
      description:
        "Proyectos de gran escala para un impacto urbano masivo (más de 10m²).",
      details: [
        "Todo del Paquete Mediano",
        "Superficie superior a 10 metros cuadrados",
        "Estudio del entorno y visibilidad",
        "Posibilidad de uso de andamios o elevador (coste extra a evaluar)",
      ],
    },
  ],
  /** -------------------------------------------------------------------
   * ============================================
   * GALERÍAS DE TRABAJOS
   * ============================================
   * Se insertan en la colección "galleryitems" la primera vez que arranca
   * el servidor. Las imágenes viven en public/images del frontend.
   */
  galleryItems: [
    // ============================================
    // CATEGORÍA: DISEÑO GRÁFICO
    // ============================================
    {
      category: "GraphicDesign",
      order: 1,
      title: "Rayo Lab",
      imageUrl: "/images/rayolab-bg.webp",
      description:
        "Nuestra marca es la base de todo lo que hacemos, definiendo quiénes somos y por qué existimos...",
    },
    {
      category: "GraphicDesign",
      order: 2,
      title: "Ivy",
      imageUrl: "/images/ivy-bg.webp",
      description:
        "Con este símbolo representamos nuestra singularidad, nuestro carácter, cultura y estilo como marca...",
    },
    {
      category: "GraphicDesign",
      order: 3,
      title: "Caribes",
      imageUrl: "/images/caribes-bg.webp",
      description:
        "Inspirados en las calles de Caracas. Observamos la sinergia entre el ciudadano y su transporte diario...",
    },
    {
      category: "GraphicDesign",
      order: 4,
      title: "Yujushapes",
      imageUrl: "/images/yujushapes-bg.webp",
      description:
        "Personaje que encarna la alegría y la pasión por el movimiento. Testigo silencioso de cada truco...",
    },
    {
      category: "GraphicDesign",
      order: 5,
      title: "Santoku",
      imageUrl: "/images/santoku.webp",
      description:
        "El logotipo del restaurante Santoku está inspirado en la icónica estampa japonesa La Gran Ola de Kanagawa...",
    },
    // ============================================
    // CATEGORÍA: ROPA PERSONALIZADA
    // ============================================
    {
      category: "CustomClothing",
      order: 1,
      title: "Graffiti Wear",
      imageUrl: "/images/clothes-graff.webp",
      description: "Personalización con spray sobre tela.",
    },
    {
      category: "CustomClothing",
      order: 2,
      title: "Diseño en Muro",
      imageUrl: "/images/clothes-wall.webp",
      description: "El arte de la pared a tu ropa.",
    },
    {
      category: "CustomClothing",
      order: 3,
      title: "Texturas Urbanas",
      imageUrl: "/images/clothes.webp",
      description: "Capas de arte y moda.",
    },
    {
      category: "CustomClothing",
      order: 4,
      title: "Rayo Lab Merch",
      imageUrl: "/images/rayolab-gorra.webp",
      description: "Gorras con estilo.",
    },
    {
      category: "CustomClothing",
      order: 5,
      title: "Bolsa Rayo Lab",
      imageUrl: "/images/rayolab-bolsa.webp",
      description: "Lleva el arte contigo.",
    },
    {
      category: "CustomClothing",
      order: 6,
      title: "Copa Rayo Lab",
      imageUrl: "/images/rayolab-copa.webp",
      description: "Hasta en tu café.",
    },
    // ============================================
    // CATEGORÍA: MURALES
    // ============================================
    {
      category: "Murals",
      order: 1,
      title: "This is Goiko",
      imageUrl: "/images/goiko.webp",
      description: "Un mural vibrante para un restaurante icónico.",
    },
    {
      category: "Murals",
      order: 2,
      title: "Chavela Taco Masters",
      imageUrl: "/images/chavela.webp",
      description: "Arte que abre el apetito.",
    },
    {
      category: "Murals",
      order: 3,
      title: "Con Las Manos",
      imageUrl: "/images/manos-pizza.webp",
      description: "Pizzería con un toque radical.",
    },
    {
      category: "Murals",
      order: 4,
      title: "Media Luna",
      imageUrl: "/images/media-luna.webp",
      description: "Decoración navideña en cristalera.",
    },
    {
      category: "Murals",
      order: 5,
      title: "El Refugio, Madrid",
      imageUrl: "/images/el-refugio.webp",
      description: "La mirada del lobo en un refugio de montaña.",
    },
    {
      category: "Murals",
      order: 6,
      title: "Sancho Abarca, Zaragoza",
      imageUrl: "/images/sancho-abarca.webp",
      description: "Un zorro lleno de color en el paisaje de Zaragoza.",
    },
  ],
}; 
