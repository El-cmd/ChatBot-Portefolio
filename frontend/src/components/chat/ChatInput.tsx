"use client";

import * as React from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  value: string;
  placeholder: string;
  disabled?: boolean;
  isSending?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  hint: string;
  sendLabel: string;
  sendingLabel: string;
};

export function ChatInput({
  value,
  placeholder,
  disabled,
  isSending,
  onChange,
  onSend,
  hint,
  sendLabel,
  sendingLabel
}: ChatInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className="min-h-[96px] resize-none"
      />
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{hint}</span>
        <Button
          type="button"
          onClick={onSend}
          disabled={disabled || isSending || !value.trim()}
          className="gap-2"
        >
          {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isSending ? sendingLabel : sendLabel}
        </Button>
      </div>
    </div>
  );
}
