import environment from '../../environments/environment';
import * as jwt from 'jsonwebtoken';


export default class shared {


  async verifyIdToken(req, res, next){

    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
      res.send({success: false, data: null, error: {code: 'noTokenProvided', message: 'No se detectó el token'}});
      return;
    }
    
    try {
      const token = req.headers.authorization.split(' ')[1];
      const {data} = jwt.verify(token, environment.jwtSecret) as {data: any};
      
      res.locals = data;
      next();

    } catch (err) {
      res.send({success: false, data: null, error: {code: 'errorVerifyingId', message: 'Error verificando Identidad'}});
    }

  }


  getClientIP(req: any) {
    const ip = 
    (req.headers['x-forwarded-for'] as string || '').split(',')[0].trim() || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection['socket']?.remoteAddress || null;
    
    return ip
  }






}