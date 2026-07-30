export const siteName = "Parque Industrial Verde";
export const siteDescription =
  "Parque Industrial Verde lidera la economía circular en El Salvador con infraestructura, trazabilidad y soluciones ambientales para empresas y comunidades.";

export function buildMeta(title: string, description: string, path: string, ogType = "website") {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: "/",
  email: "comunicaciones@parqueindustrialverde.com",
  telephone: "+50321211400",
  sameAs: [
    "https://www.facebook.com/parqueindustrialverde",
    "https://www.instagram.com/parqueindustrialverde.sv/",
    "https://www.tiktok.com/@parqueindustrialverde.sv",
    "https://www.linkedin.com/company/parque-industrial-verde/",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "SV",
    addressRegion: "El Salvador",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué materiales reciben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plásticos, metales, papel, cartón y una amplia variedad de residuos electrónicos. Algunos materiales requieren disposición responsable por cobro según su condición.",
      },
    },
    {
      "@type": "Question",
      name: "¿Realizan recolecciones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Diseñamos rutas para empresas, campañas y solicitudes específicas según volumen, ubicación y tipo de material.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo funciona el certificado de destrucción?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Documentamos el proceso de destrucción y disposición con evidencia y trazabilidad para respaldar auditorías y cumplimiento interno.",
      },
    },
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  areaServed: ["San Salvador", "Chalchuapa", "Costa del Sol", "El Salvador"],
  telephone: "+50321211400",
  email: "comunicaciones@parqueindustrialverde.com",
  url: "/contacto",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Soluciones ambientales",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestión de residuos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Trazabilidad digital" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Certificados de destrucción" } },
    ],
  },
};
