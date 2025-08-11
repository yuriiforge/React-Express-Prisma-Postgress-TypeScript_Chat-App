import type { SignupData } from '../schemas/auth.schema';
import {
  httpService,
  type HttpResponse,
  type HttpService,
} from './http.service';

class AuthService {
  constructor(private http: HttpService) {}

  async getMe<T>() {
    return this.http.get<T>('/api/auth/me');
  }

  async signup<T>(data: SignupData): Promise<HttpResponse<T>> {
    return this.http.post<T>('/api/auth/signup', data);
  }
}

export const authService = new AuthService(httpService);
