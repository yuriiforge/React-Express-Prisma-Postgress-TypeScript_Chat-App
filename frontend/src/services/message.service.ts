import { httpService, type HttpService } from './http.service';

class MessageService {
  constructor(private http: HttpService) {}

  async getConversations<T>() {
    return this.http.get<T>('/api/messages/conversations');
  }
}

export const messageService = new MessageService(httpService);
