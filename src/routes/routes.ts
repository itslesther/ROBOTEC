import * as express from 'express';
import account from './account';
import users from './users';
import * as bodyParser from 'body-parser';

const routes = express.Router();

routes.use(bodyParser.urlencoded({extended:true}));
routes.use(bodyParser.json());

routes.use('/account', account);
routes.use('/users', users);


export default routes;
