import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  initializeMiddlewares() {
    this.app.use(bodyParser.json())
  }

  initializeControllers(controllers) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;