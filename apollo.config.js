module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "uber-eats-backend",
      url:
        process.env.NODE_ENV === "production"
          ? "https://hsuber-eats-backend.herokuapp.com/graphql"
          : "http://localhost:4001/graphql",
    },
  },
};
