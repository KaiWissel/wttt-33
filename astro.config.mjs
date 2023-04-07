import { defineConfig } from "astro/config";
import { prisma } from "./src/plugins/prisma-client";

//
import node from "@astrojs/node";
// import netlify from "@astrojs/netlify/edge-functions";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: { port: 1234, host: true },
  //   // adapter: netlify(),
  integrations: [vue(), prisma],
});
