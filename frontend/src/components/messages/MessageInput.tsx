import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { messageSchema, type MessageData } from '../../schemas/message.schema';
import useSendMessage from '../../hooks/useSendMessage';
import Spinner from '../Spinner';

const MessageInput = () => {
  const { register, handleSubmit, reset } = useForm<MessageData>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: '' },
  });

  const { sendMessage, loading } = useSendMessage();

  const onSubmit = (data: MessageData) => {
    sendMessage(data.message);
    reset();
  };

  return (
    <form className="px-4 mb-3 " onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          {...register('message')}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          disabled={loading}
        >
          {loading ? <Spinner /> : <Send className="w-6 h-6 text-white" />}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
