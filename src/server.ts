import express from 'express';

import router from './routes';

import mongoose from 'mongoose';

import bodyParser from 'body-parser';

import 'dotenv/config';

const app = express();

const ENV: any = process.env;

app.use(bodyParser.json());

let clients: any[] = [];

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Enviar um ping inicial para verificar a conexão
    res.write('data: Conexão estabelecida\n\n');

    console.log(res);

    clients.push(res);

    // Remover o cliente da lista ao fechar a conexão
    req.on('close', () => {
        clients = clients.filter((client) => client !== res);
    });
});

// Endpoint para enviar notificações
app.post('/notify', (req, res) => {
    const notification = {
        message: req.body.message || 'Nova notificação do backend',
        timestamp: new Date(),
    };
    clients.forEach((client) => {
        client.write(`data: ${JSON.stringify(notification)}\n\n`);
    });
    res.status(200).send('Notificação enviada');
});

mongoose
    .connect(ENV.HOST_DATABASE)
    .then(() => {
        console.log('Database connected successfully.');

        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port : ${ENV.PORT} `);
        });
    })
    .catch((error) => console.log(error));

app.use(router);
