import * as express from 'express';
import UsersService from '../../services/users/users';
import SharedService from '../../services/shared/shared';


const usersService = new UsersService();

const sharedService = new SharedService();


const routes = express.Router();

routes.get('/me', sharedService.verifyIdToken, ((req, res) => {
  usersService.getUserByEmail(res.locals.email)
    .then(data => res.send({ success: true, data, error: null }))
    .catch(error => res.send({ success: false, data: null, error }));
}));

export default routes;