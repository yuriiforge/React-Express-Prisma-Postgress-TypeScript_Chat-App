import { HttpMethod } from './httpMethods.enum';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface HttpResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export class HttpService {
  private baseUrl: string;

  constructor(baseUrl = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    try {
      const res = await fetch(this.baseUrl + url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        ...options,
      });

      const contentType = res.headers.get('content-type');
      let data: T | undefined = undefined;
      if (contentType?.includes('application/json')) {
        data = await res.json();
      }

      if (!res.ok) {
        return {
          status: res.status,
          error: data?.toString() || res.statusText,
        };
      }

      return { status: res.status, data };
    } catch (error: unknown) {
      let message = 'Network error';

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }

      return { status: 0, error: message };
    }
  }

  get<T>(url: string): Promise<HttpResponse<T>> {
    return this.request<T>(url, { method: HttpMethod.GET });
  }

  post<T, B = unknown>(url: string, body: B): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: HttpMethod.POST,
      body: JSON.stringify(body),
    });
  }

  put<T, B = unknown>(url: string, body: B): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: HttpMethod.PUT,
      body: JSON.stringify(body),
    });
  }

  delete<T>(url: string): Promise<HttpResponse<T>> {
    return this.request<T>(url, { method: HttpMethod.DELETE });
  }
}

export const httpService = new HttpService();
