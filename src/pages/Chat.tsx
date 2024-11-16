import React, { useState } from 'react';
import { Send, FileText } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I can help you analyze your documents. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'I understand your question. Let me analyze the documents and provide an answer...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-12rem)] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Document Chat</h2>
          <p className="text-sm text-gray-500">Ask questions about your documents</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <FileText className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about your documents..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;