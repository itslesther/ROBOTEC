import * as jwt from 'jsonwebtoken';
import environment from '../../environments/environment';
import ActiveDirectory = require('activedirectory');


export default class account {

  login(email: string, password: string, isActiveDirectory: boolean) {
    return new Promise(async (resolve, reject) => {
      try {

        if(isActiveDirectory) {
          try {
            await this.activeDirectoryAuth(email, password);

          } catch (err) { reject(err); return; }

        } else {

          // const user = await db.collection('users').findOne({email: email.toLowerCase()});
  
          // if(!user) {
          //   reject({code: 'invalidEmail', message: 'Correo inválido'}); return;
          // }
  
          // const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
  
          // if(!passwordsMatch) {
          //   reject({code: 'invalidPassword', message: 'Contraseña inválida'}); return;
          // }
  
          // const data = {_id: user._id};
        }

        const data = {email};

        const token = jwt.sign({data}, environment.jwtSecret, {expiresIn: '1 day'});
        
        resolve({token, email});
        // resolve({user, token, ip});
        
      } catch (err) {
        console.log('ERR');
        console.error(JSON.stringify(err));
        reject({code: 'anErrorHasOccured', message: 'Ha ocurrido un error. Intente más tarde'});
      }
    });
  }



  private activeDirectoryAuth(email: string, password: string){
    return new Promise((resolve, reject) => {
      const ad = new ActiveDirectory(environment.activeDirectoryConfig);
      // Authenticate
      ad.authenticate(email, password, (err, auth) => {
        if (err) {
          reject({code: 'activeDirectoryError', message: JSON.stringify(err)});
          return;
        }
        if (auth) resolve();
        else reject({code: 'authenticationFailed', message: 'Error autenticandose'});
      });
    });
  }





}