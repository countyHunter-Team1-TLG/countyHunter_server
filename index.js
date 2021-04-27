const app = require("./services/server").app;
const { MongoClient } = require("mongodb");
const UsersConnection = require("./services/database/users").UsersConnection;
require("dotenv").config();

const port = process.env.PORT || 8000;
console.log(process.env.DB_URI);
MongoClient.connect(
  process.env.DB_URI,
  // Set the poolSize to 50 connections.
  // Set the write timeout limit to 5000 milliseconds.
  {
    useNewUrlParser: true,
    poolSize: 50,
    //connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    // other options can go here
  }
)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersConnection.injectDB(client);
    //await another class object.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
