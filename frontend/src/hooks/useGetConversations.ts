import { useEffect, useState } from 'react';
import type { Conversation } from '../zustand/useConversation';
import { messageService } from '../services/message.service';
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const res = await messageService.getConversations<Conversation[]>();

        if (res.error || !res.data) {
          throw new Error(res.error ?? 'No conversations found');
        }

        setConversations(res.data);
      } catch (error: unknown) {
        console.error(error);
        toast.error('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
