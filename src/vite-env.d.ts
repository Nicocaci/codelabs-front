// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // Link del evento de Cal.com, ej: "codelabs/reunion-inicial"
  readonly VITE_CAL_LINK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
