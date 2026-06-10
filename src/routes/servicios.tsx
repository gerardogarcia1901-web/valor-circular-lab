import { createFileRoute } from "@tanstack/react-router";

import { ServicesPage } from "@/components/piv-site";
import { buildMeta } from "@/lib/piv-seo";

export const Route = createFileRoute("/servicios")({
  head: () =>
    buildMeta(
      "Servicios ambientales — Recolección, trazabilidad y destrucción certificada",
      "Gestión de residuos, recuperación de materiales, certificación y trazabilidad para empresas, industrias y corporaciones.",
      "/servicios",
    ),
  component: ServicesPage,
});
