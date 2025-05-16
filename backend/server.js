const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = require("./app");

dotenv.config();

const PORT = 3000;

const startServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://jerryolisa:4nMlhci1yQZTepqF@cluster0.k0wjqhd.mongodb.net/acit2911?retryWrites=true&w=majority&appName=Cluster0");

    console.log("DB is working");

    app.use(
      session({
        secret: "supersecretkey",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          client: mongoose.connection.getClient(),
          collectionName: "sessions",
          ttl: 60 * 60 * 24 * 30, 
        }),
        cookie: {
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 30, 
        },
      })
    );

    const projectRoute = require("./routers/projectRoutes")
    app.use('/projects', projectRoute)

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

