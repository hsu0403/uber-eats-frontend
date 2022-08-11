module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "uber-eats-backend",
      url: "http://localhost:4001/graphql",
    },
  },
};
