import useGetMessages from '../../hooks/useGetMessages';
import Spinner from '../Spinner';
import Message from './Message';

const Messages = () => {
  const { loading, messages } = useGetMessages();

  if (loading) return <Spinner />;

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
export default Messages;
