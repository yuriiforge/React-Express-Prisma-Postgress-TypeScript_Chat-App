import { httpService, type HttpService } from './http.service';

class MessageService {
  constructor(private http: HttpService) {}

  async getConversations<T>() {
    return this.http.get<T>('/api/messages/conversations');
  }

  async getMessages<T>(conversationId: string) {
    return this.http.get<T>(`/api/messages/${conversationId}`);
  }
}

export const messageService = new MessageService(httpService);
