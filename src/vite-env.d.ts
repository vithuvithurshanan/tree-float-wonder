/// <reference types="vite/client" />

// vite-imagetools resolves a trailing `&url` query directive to a plain
// string URL at build time (vite/client.d.ts already covers the `?url` case);
// TS has no way to infer that from the specifier on its own.
declare module "*&url" {
  const src: string;
  export default src;
}
