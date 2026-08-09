'use client';

import { useMemo } from 'react';

import { FiSearch } from 'react-icons/fi';

import PlaceholderThumb from '@/common/components/PlaceholderThumb';

import {
  CHANNEL_LABELS,
  CHANNEL_TONE,
  type Conversation,
} from '../models/tin-nhan.model';

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelect: (id: string) => void;
};

// ============================================================================
// Conversation row
// ============================================================================

const ConversationRow = ({
  conversation,
  isSelected,
  onSelect,
}: {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const channel = CHANNEL_TONE[conversation.channel];

  const statusDotColor =
    conversation.status === 'online'
      ? 'bg-jade-500'
      : conversation.status === 'away'
        ? 'bg-accent-500'
        : 'bg-gray-300';

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isSelected ? 'true' : undefined}
      className={`flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 md:px-5 md:py-3.5 ${
        isSelected ? 'bg-brand-50/60' : ''
      }`}
    >
      {/* Avatar + status dot */}
      <div className="relative shrink-0">
        <div className="h-12 w-12 overflow-hidden rounded-full md:h-14 md:w-14">
          <PlaceholderThumb
            seed={conversation.id}
            label={conversation.name.charAt(0)}
            className="h-full w-full"
          />
        </div>
        <span
          aria-hidden
          className={`absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white ${statusDotColor}`}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate font-serif text-sm font-bold text-gray-900 md:text-base">
              {conversation.name}
            </h3>
            {conversation.isVerified && (
              <span
                aria-label="Đã xác minh"
                className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-2 w-2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            )}
          </div>
          <span className="shrink-0 text-theme-xs text-gray-500">
            {conversation.lastMessageTime}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p
            className={`truncate text-theme-xs md:text-theme-sm ${
              conversation.unreadCount > 0
                ? 'font-semibold text-gray-900'
                : 'text-gray-600'
            }`}
          >
            {conversation.isOwnLastMessage && (
              <span className="text-gray-500">Bạn: </span>
            )}
            {conversation.lastMessage}
          </p>
          {conversation.unreadCount > 0 && (
            <span
              aria-label={`${conversation.unreadCount} tin nhắn chưa đọc`}
              className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 px-1.5 text-theme-xs font-bold text-white"
            >
              {conversation.unreadCount}
            </span>
          )}
        </div>

        {/* Channel badge */}
        <span
          className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-theme-xs font-semibold ${channel.bg} ${channel.text}`}
        >
          {CHANNEL_LABELS[conversation.channel]}
        </span>
      </div>
    </button>
  );
};

// ============================================================================
// ConversationList
// ============================================================================

/**
 * Danh sach conversation ben trai - loc theo search, sort theo unread + time.
 */
const ConversationList = ({
  conversations,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelect,
}: ConversationListProps) => {
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q),
    );
  }, [conversations, searchQuery]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {/* Search bar */}
      <div className="border-b border-gray-100 px-4 py-3 md:px-5 md:py-4">
        <label className="relative block">
          <span className="sr-only">Tìm kiếm hội thoại</span>
          <FiSearch
            aria-hidden
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm tên, nội dung..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 md:text-theme-sm"
          />
        </label>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
            <span className="text-4xl">🔍</span>
            <p className="mt-3 text-sm font-semibold text-gray-900">
              Không tìm thấy hội thoại
            </p>
            <p className="mt-1 text-theme-xs text-gray-500">
              Thử từ khóa khác nhé
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                isSelected={conversation.id === selectedId}
                onSelect={() => onSelect(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
