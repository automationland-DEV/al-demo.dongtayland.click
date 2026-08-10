'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { FiSearch, FiSend, FiSmile } from 'react-icons/fi';

import PlaceholderThumb from '@/common/components/PlaceholderThumb';

import {
  CHANNEL_LABELS,
  CHANNEL_TONE,
  formatMessageTime,
  type Conversation,
  type Message,
} from '../models/tin-nhan.model';

type ChatPanelProps = {
  conversation: Conversation;
  messages: Message[];
  onSend: (content: string) => void;
  onBack: () => void;
};

// ============================================================================
// Conversation header (moi conversation trong chat panel)
// ============================================================================

const ConversationHeader = ({
  conversation,
  onBack,
}: Pick<ChatPanelProps, 'conversation' | 'onBack'>) => {
  const channel = CHANNEL_TONE[conversation.channel];
  const statusLabel =
    conversation.status === 'online'
      ? 'Đang hoạt động'
      : conversation.status === 'away'
        ? 'Vắng mặt'
        : 'Ngoại tuyến';

  const statusColor =
    conversation.status === 'online'
      ? 'bg-jade-500'
      : conversation.status === 'away'
        ? 'bg-accent-500'
        : 'bg-gray-400';

  return (
    <div className="flex items-center gap-3 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
      {/* Back button (mobile only) */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Quay lại danh sách"
        className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 lg:hidden"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="h-10 w-10 overflow-hidden rounded-full md:h-11 md:w-11">
          <PlaceholderThumb
            seed={conversation.id}
            label={conversation.name.charAt(0)}
            className="h-full w-full"
          />
        </div>
        <span
          aria-hidden
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${statusColor}`}
        />
      </div>

      {/* Name + status */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h2 className="truncate font-serif text-base font-bold text-gray-900 md:text-lg">
            {conversation.name}
          </h2>
          {conversation.isVerified && (
            <span
              aria-label="Đã xác minh"
              title="Đã xác minh"
              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-2.5 w-2.5"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          )}
        </div>
        <p className="truncate text-theme-xs text-gray-600 md:text-theme-sm">
          {statusLabel}
        </p>
      </div>

      {/* Channel badge */}
      <span
        className={`hidden shrink-0 rounded-full px-2.5 py-1 text-theme-xs font-semibold md:inline-flex ${channel.bg} ${channel.text}`}
      >
        {CHANNEL_LABELS[conversation.channel]}
      </span>
    </div>
  );
};

// ============================================================================
// Message bubble
// ============================================================================

const MessageBubble = ({ message }: { message: Message }) => {
  const isMe = message.sender === 'me';

  return (
    <div
      className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar (chi hien thi khi nhan tin tu 'them') */}
      {!isMe && (
        <div className="hidden h-7 w-7 shrink-0 overflow-hidden rounded-full md:block">
          <PlaceholderThumb seed="them" label="T" className="h-full w-full" />
        </div>
      )}

      <div
        className={`max-w-[78%] md:max-w-[68%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}
      >
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-theme-xs md:text-base ${
            isMe
              ? 'rounded-br-sm bg-brand-500 text-white'
              : 'rounded-bl-sm bg-white text-gray-900'
          }`}
        >
          {message.content}
        </div>
        <span
          className={`mt-1 px-1 text-theme-xs ${isMe ? 'text-gray-500' : 'text-gray-500'}`}
        >
          {formatMessageTime(message.sentAt)}
          {isMe && message.status === 'read' && (
            <span aria-label="Đã đọc" className="ml-1 text-brand-500">
              · Đã đọc
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// Chat input
// ============================================================================

/**
 * Tran chieu cao o nhap = 4 dong x 24px (leading-6) + 28px padding (py-3.5)
 * + 2px vien. Qua nguong nay textarea moi bat thanh cuon thay vi day cao mai.
 * Doi padding hoac leading o className ben duoi thi phai sua lai so nay.
 */
const MAX_INPUT_HEIGHT = 126;

const ChatInput = ({ onSend }: { onSend: (content: string) => void }) => {
  const [draft, setDraft] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea (toi da 4 dong)
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    const fit = () => {
      ta.style.height = 'auto';

      // `scrollHeight` do noi dung + padding nhung KHONG gom duong vien, trong
      // khi `box-sizing: border-box` cua Tailwind lai coi chieu cao la da gom
      // vien. Gan thang scrollHeight se hut mat dung phan vien do va cat ngang
      // dong chu. Doc vien tu computed style thay vi `offsetHeight -
      // clientHeight`: hieu do phu thuoc vao thoi diem trinh duyet tinh xong
      // layout, con computed style thi luon dung.
      const style = getComputedStyle(ta);
      const border =
        parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

      const wanted = ta.scrollHeight + border;
      ta.style.height = `${Math.min(wanted, MAX_INPUT_HEIGHT)}px`;

      // Chi bat cuon khi that su cham tran. De `overflow: auto` mac dinh thi
      // sai so lam tron nua pixel cung du lam thanh cuon hien ra ngay khi moi
      // co mot dong - dung cai thanh cuon dang lo trong o nhap.
      ta.style.overflowY = wanted > MAX_INPUT_HEIGHT ? 'auto' : 'hidden';
    };

    fit();

    // Qua breakpoint md co chu doi tu 14px sang 16px, keo theo chieu cao dong
    // doi. Chieu cao da ghim bang px o tren se khong con vua nua neu khong do lai.
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [draft]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setDraft('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Le tren mong hon le duoi: keo ca hang nhap nhich len, sat vao khung
      // hoi thoai hon thay vi troi giua mot vung trong.
      className="flex items-end gap-2 border-t border-gray-100 bg-white px-4 pb-3 pt-2 md:px-6 md:pb-4 md:pt-2.5"
    >
      <button
        type="button"
        aria-label="Emoji"
        // `mb-2` canh tam nut vao dung tam DONG CHU CUOI cua o nhap - xem
        // phep tinh o nut Gui ben duoi.
        className="mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
      >
        <FiSmile aria-hidden className="h-5 w-5" />
      </button>

      <textarea
        ref={textareaRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Nhập tin nhắn..."
        rows={1}
        aria-label="Tin nhắn"
        // `leading-6` co dinh o ca hai co chu: neu de line-height chay theo
        // text-sm/md:text-base thi chieu cao dong doi luc qua breakpoint.
        // `overflow-hidden` la trang thai truoc khi JS chay, tranh nhap nhay
        // thanh cuon o lan ve dau tien.
        // `pt-3 pb-4` thay vi `py-3.5`: tong van 28px nen chieu cao o khong
        // doi, nhung dong chu nhich len 2px. Chu Viet co nhieu dau duoi (ậ, ẻ)
        // nen can giua theo toan hoc lai nhin nhu bi tut xuong.
        className="flex-1 resize-none overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 px-4 pb-4 pt-3 text-sm leading-6 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 md:text-base"
      />

      <button
        type="submit"
        disabled={!draft.trim()}
        aria-label="Gửi"
        // Hang dung `items-end` nen nut von nam sat day o nhap, thap hon dong
        // chu. Nang len 8px (`mb-2`) la tam nut trung dung tam dong cuoi:
        // day o nhap - pb-4 (16px) - nua dong (12px) = tam dong cuoi;
        // day nut  - mb-2 (8px)  - nua nut  (20px) = tam nut. Bang nhau.
        // Cong thuc dung cho ca khi o nhap gian ra 4 dong.
        className="mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-theme-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <FiSend aria-hidden className="h-5 w-5" />
      </button>
    </form>
  );
};

// ============================================================================
// ChatPanel
// ============================================================================

/**
 * Chat panel ben phai - hien thi conversation dang chon.
 * - Conversation header (avatar, ten, status)
 * - Message list (scroll, chat bubbles)
 * - Input (auto-grow textarea, Enter de gui)
 */
const ChatPanel = ({
  conversation,
  messages,
  onSend,
  onBack,
}: ChatPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll xuong cuoi khi messages thay doi
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-gradient-to-b from-gray-50 to-white">
      <ConversationHeader conversation={conversation} onBack={onBack} />

      {/* Message list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6"
      >
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      <ChatInput onSend={onSend} />
    </div>
  );
};

export default ChatPanel;
