/// <reference types="vite/client" />

declare module "*.docx" {
  const src: string;
  export default src;
}

declare module "*.xlsx" {
  const src: string;
  export default src;
}
