import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/piv-site";
import { buildMeta, faqSchema, localBusinessSchema } from "@/lib/piv-seo";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    ...buildMeta(
      "Contacto Parque Industrial Verde — Solicita recolección y atención comercial",
      "Habla con Parque Industrial Verde, solicita recolección, consulta ubicaciones y agenda soluciones ambientales para tu operación.",
      "/contacto",
    ),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: ContactPage,
});
