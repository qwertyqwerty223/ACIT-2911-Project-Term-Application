const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = require("./app");

dotenv.config();

const PORT = 3000;

const startServer = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URI}`);

    console.log("DB is working");

    
    app.set('trust proxy', 1); // if behind proxy/load balancer (like Render)

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
          secure: true,          
          httpOnly: true,        
          sameSite: "none",      
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

