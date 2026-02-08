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
  sources: {
    id: string;
    source: string;
    chunk_index: number;
    score: number;
    text: string;
  }[];
  attachments: {
    type: "image";
    url: string;
    alt?: string | null;
    source_id?: string | null;
  }[];
};
