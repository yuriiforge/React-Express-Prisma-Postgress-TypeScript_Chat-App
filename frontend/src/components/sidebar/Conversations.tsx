import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import Spinner from '../Spinner';
import Conversation from './Conversation';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  if (loading) return <Spinner />;
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}
    </div>
  );
};
export default Conversations;
