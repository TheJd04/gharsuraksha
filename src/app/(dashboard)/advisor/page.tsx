"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function AdvisorPage() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ parts: [{ type: 'text', text: input }], role: "user" } as any);
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>🤖</span> AI Insurance Advisor
        </h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Ask questions about your inventory, coverage, or how to handle a claim. I know your portfolio!
        </p>
      </div>

      <div className="glass-card flex-1 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[var(--muted-foreground)]">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">How can I help you today?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full mt-4">
                {[
                  "Am I covered for theft?",
                  "What are my biggest coverage gaps?",
                  "How do I file a claim for fire damage?",
                  "Is my jewelry fully insured?"
                ].map(q => (
                  <button
                    key={q}
                    onClick={() => handleInputChange({ target: { value: q } } as any)}
                    className="p-3 text-sm text-left rounded-lg bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} slide-in-left`}
              >
                <div
                  className={`text-sm md:text-base whitespace-pre-wrap ${
                    m.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"
                  }`}
                >
                  {m.parts.map(p => p.type === 'text' ? p.text : '').join('')}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start slide-in-left">
              <div className="chat-bubble-assistant flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[var(--background)] border-t border-[var(--border)]">
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything about your coverage..."
              className="input-field pr-12 py-3 rounded-full"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--primary)] text-white hover:bg-[var(--accent)] transition-colors disabled:opacity-50"
            >
              ➤
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-[var(--muted-foreground)]">
            AI can make mistakes. Always check your actual policy document.
          </div>
        </div>
      </div>
    </div>
  );
}
