module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "honodb",
    host: "localhost",
    port: "5434",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "honodb_test",
    host: "localhost",
    port: "5434",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "honodb",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5434",
    dialect: "postgres"
  }
}; 