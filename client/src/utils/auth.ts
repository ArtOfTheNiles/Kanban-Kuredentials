import { JwtPayload, jwtDecode } from 'jwt-decode';



class AuthService {
  storageKey = 'auth_token';
  getProfile() {
    const token = this.getToken();
    if (!token) {
      return null;
    }else{
      return jwtDecode<JwtPayload>(token);
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      return false;
    }else{
      return true;
    }
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if(decoded.exp){
        return decoded.exp < (Date.now() / 1000);
      }
      return true;
    } catch (error) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem(this.storageKey) || '';
  }

  login(idToken: string) {
    localStorage.setItem(this.storageKey, idToken);
    // redirect to the home page
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    // redirect to the login page
    window.location.assign('localhost:3001/login');
  }
}

export default new AuthService();
