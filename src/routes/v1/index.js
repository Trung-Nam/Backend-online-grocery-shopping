import express from 'express';
import { StatusCodes } from 'http-status-codes';
import categoryRoutes from '~/routes/v1/categoryRoutes';
const Router = express.Router();

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' });
});


Router.use('/categories', categoryRoutes);

export const APIs_V1 = Router;
