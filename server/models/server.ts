import express, { Application } from 'express';
import cors from 'cors';

import accountRoutes from '../routes/account';
import postRoutes from '../routes/post';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        accounts: '/api/accounts',
        posts: '/api/posts',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Database
        this.dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            
        });
    }

    routes() {
        this.app.use(this.apiPaths.accounts, accountRoutes);
        this.app.use(this.apiPaths.posts, postRoutes);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log(
                'Database online',
                db.config.database,
                db.config.host,
                db.config.port
            );
            await db.sync({ force: false });
        } catch (error: unknown) {
            throw new Error(error as string | undefined);
        }
    }
}

export default Server;
