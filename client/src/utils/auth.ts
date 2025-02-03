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
    // TODO: return a value that indicates if the user is logged in
  }
  
  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
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
    window.location.assign('/login');
  }
}

export default new AuthService();
