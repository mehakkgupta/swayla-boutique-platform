import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Send, 
  ArrowLeft, 
  Sparkles, 
  Phone, 
  ShoppingBag, 
  Paperclip, 
  Smile, 
  CheckCheck 
} from 'lucide-react';

export const SellerMessagesTab: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage,
    products 
  } = useApp();

  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [isViewingChat, setIsViewingChat] = useState(false);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const relatedProduct = activeConv?.productId ? products.find(p => p.id === activeConv.productId) : undefined;

  const filteredConversations = conversations.filter(c =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const quickReplies = [
    "Yes, it is in stock!",
    "We can ship this today.",
    "Sure! Let me send you a special 10% coupon: AURA10",
    "Returns & exchanges are 100% free within 7 days."
  ];

  return (
    <div className="h-full flex flex-col pb-6">
      {!isViewingChat ? (
        /* Conversation List View matching Figma screenshot */
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-display">Messages</h3>
            <p className="text-xs text-stone-500">Live inquiries from prospective boutique shoppers</p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          </div>

          {/* Chat List matching Figma */}
          <div className="space-y-1 divide-y divide-stone-100 bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm">
            {filteredConversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  setIsViewingChat(true);
                }}
                className={`p-3.5 flex items-start gap-3 hover:bg-pink-50/40 cursor-pointer transition-colors ${
                  conv.unread ? 'bg-pink-50/20' : ''
                }`}
              >
                {/* Avatar with initial or photo */}
                <div className="relative">
                  <img
                    src={conv.customerAvatar}
                    alt={conv.customerName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-stone-100"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="w-11 h-11 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-xs absolute inset-0 -z-10">
                    {conv.customerName.charAt(0)}
                  </div>
                  {conv.unread && (
                    <span className="w-3 h-3 bg-pink-500 rounded-full border-2 border-white absolute top-0 right-0" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className={`text-xs ${conv.unread ? 'font-bold text-stone-900' : 'font-semibold text-stone-800'}`}>
                      {conv.customerName}
                    </h4>
                    <span className="text-[10px] text-stone-400">{conv.timeAgo}</span>
                  </div>
                  <p className={`text-xs truncate ${conv.unread ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Detailed Active Chat View */
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-[580px]">
          {/* Chat Top Bar */}
          <div className="p-3.5 border-b border-stone-100 bg-stone-50/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsViewingChat(false)}
                className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="relative">
                <img
                  src={activeConv.customerAvatar}
                  alt={activeConv.customerName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white absolute bottom-0 right-0" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">{activeConv.customerName}</h4>
                <span className="text-[10px] text-emerald-600 font-medium">Online now</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-stone-500 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* In-Chat Related Product Badge if discussing an item */}
          {relatedProduct && (
            <div className="bg-pink-50/70 border-b border-pink-100 p-2.5 px-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-9 h-9 rounded-lg object-cover"
                />
                <div>
                  <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider block">Inquired Item</span>
                  <span className="text-xs font-bold text-stone-900">{relatedProduct.name}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-700 tabular-nums">
                ₹{relatedProduct.price.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/30">
            {activeConv.messages.map(msg => {
              const isMe = msg.sender === 'seller';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-sm shadow-sm'
                        : 'bg-white border border-stone-200 text-stone-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-stone-400 px-1">
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-pink-500" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Chips */}
          <div className="px-3 py-2 bg-stone-50/80 border-t border-stone-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(reply)}
                className="text-[11px] bg-white border border-stone-200 text-stone-600 hover:border-pink-300 hover:text-pink-600 px-2.5 py-1 rounded-full whitespace-nowrap shadow-xs transition-colors shrink-0"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-2.5 border-t border-stone-100 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-40 text-white transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
