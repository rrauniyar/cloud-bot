import {myAxios} from './helper';

export const SignUpService=(user)=>{
   return myAxios.post('/auth/signup',user).then((response)=>response.data);
}