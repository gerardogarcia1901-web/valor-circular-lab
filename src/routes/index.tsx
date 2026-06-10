import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/piv-site";
import { buildMeta } from "@/lib/piv-seo";

export const Route = createFileRoute("/")({
  head: () =>
    buildMeta(
      "Parque Industrial Verde — Economía circular con escala industrial",
      "Infraestructura, trazabilidad y soluciones ambientales para empresas y comunidades en El Salvador.",
      "/",
    ),
  component: HomePage,
});
