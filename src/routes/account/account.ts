import * as express from 'express';
import AccountService from '../../services/account';


const accountService = new AccountService();

const routes = express.Router();


routes.post('/login', ((req, res) => {

  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.send({ success: false, data: null, error: {code: 'missingAuthHeader', message: 'No hay header the Autorización'} });
  }

  // verify auth credentials
  const base64Credentials =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString();
  const [email, password] = credentials.split(':');


  if (!email || !password) {
    res.send({success: false, data: null, error: { code: 'emptyFields', message: 'Hay campos vacíos' } });
    return;
  }

  accountService.login(email, password, !!req.body.isActiveDirectory)
    .then(data => res.send({ success: true, data, error: null }))
    .catch(error => res.send({ success: false, data: null, error }));

}));



export default routes;