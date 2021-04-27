const app = require("./services/server");
const { MongoClient } = require("mongodb");
const Users = require("./database/users");

const port = process.env.PORT || 8000;

MongoClient.connect(
  process.env.DB_URI,
  // Set the poolSize to 50 connections.
  // Set the write timeout limit to 5000 milliseconds.
  {
    useNewUrlParser: true,
    poolSize: 50,
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    // other options can go here
  }
)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await Users.injectDB(client);
    //await another class object.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
