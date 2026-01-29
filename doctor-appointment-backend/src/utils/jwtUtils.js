export const parseJwt = (token) => {
  if(!token) return null;
  try{
    const p = token.split('.')[1];
    return JSON.parse(atob(p));
  }catch(e){ return null; }
};
