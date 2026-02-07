import ReactMarkdown, { type Components } from "react-markdown";

import { cn } from "@/lib/utils";
import { parseUiBlocks, type UiPart } from "@/lib/chat/parse-ui-blocks";
import { renderUiBlock } from "@/components/chat/ui-blocks";
import { Card } from "@/components/ui/card";
import type { ChatMessage as ChatMessageType } from "@/lib/chat/types";

type ChatMessageProps = {
  message: ChatMessageType;
};

const splitMarkdownSections = (markdown: string) =>
  markdown
    .split(/\n-{3,}\n/)
    .map((section) => section.trim())
    .filter(Boolean);

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const parsed = isUser
    ? {
        parts: [{ type: "markdown", content: message.content }] as UiPart[]
      }
    : parseUiBlocks(message.content);
  const markdownComponents: Components = {
    h1: ({ children }) => <h1 className="text-lg font-semibold tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base font-semibold tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-semibold tracking-tight">{children}</h3>,
    p: ({ children }) => <p className="leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    hr: () => <hr className="my-3 border-border/60" />,
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline-offset-4 hover:underline"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-background/60 px-1.5 py-0.5 text-[0.85em]">{children}</code>
    )
  };

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground"
        )}
      >
        <div className="space-y-3 whitespace-pre-wrap">
          {parsed.parts.map((part, index) => {
            if (part.type === "ui") {
              return <div key={`ui-${index}`}>{renderUiBlock(part.block)}</div>;
            }
            const sections = splitMarkdownSections(part.content);
            return (
              <div key={`md-${index}`} className="space-y-3">
                {sections.map((section, sectionIndex) => (
                  <Card
                    key={`section-${index}-${sectionIndex}`}
                    className="border-border/60 bg-background/70 px-4 py-3"
                  >
                    <ReactMarkdown skipHtml components={markdownComponents}>
                      {section}
                    </ReactMarkdown>
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
