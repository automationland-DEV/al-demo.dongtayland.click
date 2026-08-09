'use client';

import { useState } from 'react';

import { FiMessageSquare } from 'react-icons/fi';

import ChatPanel from './ChatPanel';
import ConversationList from './ConversationList';
import {
  CONVERSATIONS,
  MESSAGES_BY_CONVERSATION,
  type Conversation,
  type Message,
} from '../models/tin-nhan.model';

/**
 * Inbox client wrapper - quan ly state chung:
 * - selectedConversationId: id dang chon
 * - conversations: list (co the update unread count)
 * - messagesByConversation: messages (co the update khi send)
 * - searchQuery: filter trong list
 * - showChatMobile: false (list) -> true (chat) tren mobile
 */
const InboxClient = () => {
  const [selectedId, setSelectedId] = useState<string | null>(CONVERSATIONS[0]?.id ?? null);
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [messagesByConversation, setMessagesByConversation] = useState<
    Record<string, Message[]>
  >(() => {
    // Clone mock data tranh mutate
    const cloned: Record<string, Message[]> = {};
    Object.entries(MESSAGES_BY_CONVERSATION).forEach(([key, list]) => {
      cloned[key] = [...list];
    });
    return cloned;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatMobile, setShowChatMobile] = useState(false);

  const selectedConversation = selectedId
    ? conversations.find((c) => c.id === selectedId) ?? null
    : null;

  const selectedMessages = selectedId
    ? messagesByConversation[selectedId] ?? []
    : [];

  // Khi user select tu list -> reset unread count + mobile chat visible
  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowChatMobile(true);
    // Reset unread ngay khi chon (sync state thay vi effect)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
    );
  };

  const handleBack = () => setShowChatMobile(false);

  // Send message -> append vao conversation
  const handleSend = (content: string) => {
    if (!selectedId) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const timeLabel = `${hh}:${mm}`;

    setMessagesByConversation((prev) => {
      const list = prev[selectedId] ?? [];
      return {
        ...prev,
        [selectedId]: [
          ...list,
          {
            id: `m-${Date.now()}`,
            conversationId: selectedId,
            sender: 'me',
            content,
            sentAt: now.toISOString(),
            status: 'sent',
          },
        ],
      };
    });

    // Update lastMessage preview trong list
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              lastMessage: content,
              lastMessageTime: timeLabel,
              lastMessageAt: now.toISOString(),
              isOwnLastMessage: true,
            }
          : c,
      ),
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-theme-sm md:rounded-3xl md:shadow-theme-md">
      <div className="grid h-[calc(100vh-16rem)] min-h-[500px] grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* ======= List (left) ======= */}
        <div
          className={`min-h-0 border-gray-100 ${
            showChatMobile ? 'hidden lg:block' : 'block'
          } lg:border-r`}
        >
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelect={handleSelect}
          />
        </div>

        {/* ======= Chat (right) ======= */}
        <div
          className={`min-h-0 ${
            showChatMobile ? 'block' : 'hidden lg:block'
          }`}
        >
          {selectedConversation ? (
            <ChatPanel
              conversation={selectedConversation}
              messages={selectedMessages}
              onSend={handleSend}
              onBack={handleBack}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Empty state - khi chua chon conversation
// ============================================================================

const EmptyState = () => (
  <div className="flex h-full min-h-[400px] flex-col items-center justify-center px-6 py-12 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-500">
      <FiMessageSquare aria-hidden className="h-10 w-10" />
    </div>
    <h3 className="mt-5 font-serif text-xl font-bold text-gray-900">
      Chọn một hội thoại
    </h3>
    <p className="mt-2 max-w-xs text-sm text-gray-600">
      Chọn cuộc trò chuyện bên trái để bắt đầu nhắn tin với môi giới, chủ đầu tư hoặc đội ngũ hỗ trợ.
    </p>
  </div>
);

export default InboxClient;
