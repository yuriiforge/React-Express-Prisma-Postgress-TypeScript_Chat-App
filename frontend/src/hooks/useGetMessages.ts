import { useEffect, useState } from 'react';
import useConversation, { type Message } from '../zustand/useConversation';
import { messageService } from '../services/message.service';
import { getErrorMessage } from '../utils/getErrorMessage';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      try {
        setLoading(true);
        setMessages([]);
        const res = await messageService.getMessages<Message[]>(
          selectedConversation.id
        );

        if (res.error || !res.data) {
          throw new Error(res.error ?? 'No user data returned');
        }

        setMessages(res.data);
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        toast.error(message);

        return { status: 0, error: message };
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
