import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        classes: resolve(__dirname, "classes.html"),
        contact: resolve(__dirname, "contact.html"),
        faq: resolve(__dirname, "faq.html"),
        gallery: resolve(__dirname, "gallery.html"),
        location: resolve(__dirname, "location.html"),
        schedule: resolve(__dirname, "schedule.html"),
        testimonials: resolve(__dirname, "testimonials.html"),
        thankyou: resolve(__dirname, "thankyou.html"),
        videos: resolve(__dirname, "videos.html"),
        workshops: resolve(__dirname, "workshops.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});