import nextPwa from "next-pwa"

const withPWA = nextPwa({
  dest: "public",
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/offline",
  },
});

export default withPWA({
  // Your Next.js config
});
