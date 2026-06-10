import { createFileRoute } from "@tanstack/react-router";

import { MaterialsPage } from "@/components/piv-site";
import { buildMeta } from "@/lib/piv-seo";

export const Route = createFileRoute("/materiales")({
  head: () =>
    buildMeta(
      "Materiales reciclables y RAEE — Qué recibe Parque Industrial Verde",
      "Consulta materiales aceptados, categorías, preparación y opciones de disposición responsable por cobro.",
      "/materiales",
    ),
  component: MaterialsPage,
});
