import { defineConfig } from "astro/config";

// https://astro.build/config
// import node from "@astrojs/node";
import netlify from "@astrojs/netlify/edge-functions";

// https://astro.build/config
export default defineConfig({
  output: "server",
  // adapter: node({
  //   mode: "standalone"
  // })
  adapter: netlify(),
});
