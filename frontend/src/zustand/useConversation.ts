import { create } from 'zustand';

export type Conversation = {
  id: string;
  fullname: string;
  profilePic: string;
};

export type Message = {
  id: string;
  body: string;
  senderId: string;
};

interface ConversationState {
  selectedConversation: Conversation | null;
  messages: Message[];
  setSelectedConversation: (conversation: Conversation | null) => void;
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
