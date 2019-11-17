import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Controller from './interfaces/controller.interface';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  connectToDatabase = () => {
    const {
      MONGODB_URI
    } = process.env;
    mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }

  initializeMiddlewares() {
    this.app.use(bodyParser.json())
  }

  initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on port ${PORT}`);
    });
  }
}

export default App;