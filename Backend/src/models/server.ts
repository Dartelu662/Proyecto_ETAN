import express, { Application } from 'express';
import sequelize from '../database/connection';

class server{

    private app: Application;
        private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3017'; 
        this.listen();
        this.dbConect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("this execute from: http://localhost:" + this.port)
        })
    }

    async dbConect(){
        try {
            await sequelize.authenticate();
            console.log('conexion exitosa');
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }
}

export default server;