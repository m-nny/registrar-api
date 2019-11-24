import express from 'express';

const errorMiddleware: express.ErrorRequestHandler = (error, request, response) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).send({
        status,
        message,
    });
};

export default errorMiddleware;
