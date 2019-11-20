import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

import cors = require('cors');

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private connectToDatabase = () => {
        mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    };

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        // https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
        this.app.use(cors({ origin: '*' }));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
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
