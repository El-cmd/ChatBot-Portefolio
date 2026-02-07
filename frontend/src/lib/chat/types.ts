export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type ChatHistoryItem = {
  role: ChatRole;
  content: string;
};

export type ChatRequest = {
  message: string;
  history: ChatHistoryItem[];
};

export type ChatResponse = {
  answer: string;
};
