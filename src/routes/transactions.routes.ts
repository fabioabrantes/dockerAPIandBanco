import { Router } from 'express';

import RegisterTransactionsController from '../controllers/registerTransactionsController';

// midleware
import FindAllTransactionsByClientController from '../controllers/FindAllTransactionsByClientController';
import BalanceByUserController from '../controllers/BalanceByUserController';
import { verifyToken } from '../middlewares/verifyToken';

const routesTransactions = Router();

routesTransactions.post('/transactions', verifyToken, RegisterTransactionsController.handle);
routesTransactions.get('/transactions/:id', verifyToken, FindAllTransactionsByClientController.handle);

routesTransactions.get('/balance/:id', verifyToken, BalanceByUserController.handle);

export { routesTransactions }