import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";
import "@fontsource/lunasima/400.css";
import "@fontsource/lunasima/700.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/400-italic.css";
import "@fontsource/lora/700.css";
import "./main.css";

// ViteReactSSG renders each route to static HTML at build time and hydrates
// it in the browser. Uses BrowserRouter-style clean URLs (no hash).
export const createRoot = ViteReactSSG({ routes });
