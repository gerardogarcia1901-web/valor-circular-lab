import { createFileRoute } from "@tanstack/react-router";

import { RsePage } from "@/components/piv-site";
import { buildMeta } from "@/lib/piv-seo";

export const Route = createFileRoute("/rse")({
  head: () =>
    buildMeta(
      "RSE y educación ambiental — Impacto social de Parque Industrial Verde",
      "Campañas, educación ambiental y trabajo con comunidades para ampliar el impacto de la economía circular en El Salvador.",
      "/rse",
    ),
  component: RsePage,
});
