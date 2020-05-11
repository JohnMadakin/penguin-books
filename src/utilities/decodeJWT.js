import jwtDecode from 'jwt-decode';


export default function decodeJWT(token) {
  if(token && typeof token == 'string'){
    return jwtDecode(token);
  }
  return null;
}


