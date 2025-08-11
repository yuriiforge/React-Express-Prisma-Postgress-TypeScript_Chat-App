import { httpService, type HttpService } from './http.service';

class MessageService {
  constructor(private http: HttpService) {}

  async getConversations<T>() {
    return this.http.get<T>('/api/messages/conversations');
  }

  async getMessages<T>(conversationId: string) {
    return this.http.get<T>(`/api/messages/${conversationId}`);
  }

  async sendMessage<T>(conversationId: string, message: string) {
    return this.http.post<T>(`/api/messages/send/${conversationId}`, {
      message,
    });
  }
}

export const messageService = new MessageService(httpService);
