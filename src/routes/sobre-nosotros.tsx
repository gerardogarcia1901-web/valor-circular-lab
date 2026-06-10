import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/piv-site";
import { buildMeta } from "@/lib/piv-seo";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () =>
    buildMeta(
      "Sobre Parque Industrial Verde — Historia, visión e infraestructura",
      "Más de 23 años construyendo liderazgo, trazabilidad e infraestructura para la economía circular en El Salvador.",
      "/sobre-nosotros",
    ),
  component: AboutPage,
});
