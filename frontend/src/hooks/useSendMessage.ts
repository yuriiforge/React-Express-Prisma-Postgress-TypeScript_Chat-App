import { useState } from 'react';
import useConversation, { type Message } from '../zustand/useConversation';
import { messageService } from '../services/message.service';
import { getErrorMessage } from '../utils/getErrorMessage';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;

    try {
      setLoading(true);

      const res = await messageService.sendMessage<Message>(
        selectedConversation.id,
        message
      );

      if (res.error || !res.data) {
        throw new Error(res.error ?? 'No user data returned');
      }

      setMessages([...messages, res.data]);
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      toast.error(message);

      return { status: 0, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
