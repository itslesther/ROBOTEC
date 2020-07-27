import Shared from '../shared/shared';

const shared = new Shared();


export default class users {


  getUserByEmail(email: string) {
    return new Promise(async (resolve, reject) => {
      try {

        const user = {email};

        resolve(user);
        
      } catch (err) {
        console.log('ERR');
        console.error(JSON.stringify(err));
        reject({code: 'anErrorHasOccured', message: 'An error has occured. Try again later'});
      }
    });
  }



}