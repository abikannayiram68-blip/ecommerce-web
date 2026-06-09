import { useState } from 'react';
import { useAIAssistantStore } from '../stores/ai-assistant-store';

export function AIAssistant() {
  const [query, setQuery] = useState('');
  const { messages, loading, sendMessage } = useAIAssistantStore();
  const lastResponse = messages.filter((m) => m.role === 'assistant').pop()?.content || '';

  async function handleAsk() {
    if (!query.trim()) return;
    await sendMessage(query);
    setQuery('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">AI Shopping Assistant</h1>
        <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm mb-6">
          <div className="flex gap-3">
            <input
              className="flex-1 rounded-xl border border-primary-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              placeholder="Ask me anything about shopping..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow hover:opacity-90 disabled:opacity-50"
              onClick={handleAsk}
              disabled={loading}
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
        </div>
        {lastResponse && (
          <div className="rounded-xl bg-accent-50 border border-accent-200 p-6 shadow-sm">
            <p className="text-gray-800">{lastResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}
