import { load } from "js-yaml";

export type UiButtonStyle = "primary" | "secondary";

export type UiButton = {
  label: string;
  url: string;
  style: UiButtonStyle;
  icon?: string;
};

export type UiImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export type UiFile = {
  label: string;
  url: string;
};

export type UiBlock =
  | { type: "buttons"; data: { buttons: UiButton[] } }
  | { type: "image"; data: UiImage }
  | { type: "file"; data: UiFile };

export type UiPart = { type: "markdown"; content: string } | { type: "ui"; block: UiBlock };

const UI_BLOCK_REGEX = /```ui\s*\r?\n([\s\S]*?)\r?\n```/g;
const ALLOWED_URL = /^(https?:|mailto:|tel:|\/)/i;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeUrl = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return ALLOWED_URL.test(trimmed) ? trimmed : null;
};

const normalizeStyle = (value: unknown): UiButtonStyle =>
  value === "primary" || value === "secondary" ? value : "secondary";

const parseButtons = (payload: unknown): UiBlock | null => {
  if (!Array.isArray(payload)) {
    return null;
  }
  const buttons = payload
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }
      const label = typeof item.label === "string" ? item.label.trim() : "";
      const url = normalizeUrl(item.url);
      if (!label || !url) {
        return null;
      }
      const icon = typeof item.icon === "string" ? item.icon.trim().toLowerCase() : undefined;
      return {
        label,
        url,
        style: normalizeStyle(item.style),
        icon: icon || undefined
      } satisfies UiButton;
    })
    .filter((item): item is UiButton => Boolean(item));

  if (buttons.length === 0) {
    return null;
  }

  return { type: "buttons", data: { buttons } };
};

const parseImage = (payload: unknown): UiBlock | null => {
  if (!isRecord(payload)) {
    return null;
  }
  const url = normalizeUrl(payload.url);
  if (!url) {
    return null;
  }
  const alt = typeof payload.alt === "string" ? payload.alt.trim() : undefined;
  const caption = typeof payload.caption === "string" ? payload.caption.trim() : undefined;

  return {
    type: "image",
    data: {
      url,
      alt: alt || undefined,
      caption: caption || undefined
    }
  };
};

const parseFile = (payload: unknown): UiBlock | null => {
  if (!isRecord(payload)) {
    return null;
  }
  const label = typeof payload.label === "string" ? payload.label.trim() : "";
  const url = normalizeUrl(payload.url);
  if (!label || !url) {
    return null;
  }
  return { type: "file", data: { label, url } };
};

const parseUiBlock = (raw: string): UiBlock | null => {
  let parsed: unknown;
  try {
    parsed = load(raw);
  } catch {
    return null;
  }

  if (!isRecord(parsed)) {
    return null;
  }

  if ("buttons" in parsed) {
    return parseButtons(parsed.buttons);
  }
  if ("image" in parsed) {
    return parseImage(parsed.image);
  }
  if ("file" in parsed) {
    return parseFile(parsed.file);
  }

  return null;
};

// Parse les blocs ```ui, retourne le markdown nettoye + la liste des blocs UI valides.
export const parseUiBlocks = (markdown: string): {
  cleanMarkdown: string;
  uiBlocks: UiBlock[];
  parts: UiPart[];
} => {
  const uiBlocks: UiBlock[] = [];
  const parts: UiPart[] = [];
  let lastIndex = 0;

  for (const match of markdown.matchAll(UI_BLOCK_REGEX)) {
    const matchIndex = match.index ?? 0;
    const rawYaml = match[1] ?? "";

    const textChunk = markdown.slice(lastIndex, matchIndex);
    if (textChunk) {
      parts.push({ type: "markdown", content: textChunk });
    }

    const block = parseUiBlock(rawYaml);
    if (block) {
      uiBlocks.push(block);
      parts.push({ type: "ui", block });
    }

    lastIndex = matchIndex + match[0].length;
  }

  const tail = markdown.slice(lastIndex);
  if (tail) {
    parts.push({ type: "markdown", content: tail });
  }

  const cleanMarkdown = parts
    .filter((part) => part.type === "markdown")
    .map((part) => part.content)
    .join("");

  return { cleanMarkdown, uiBlocks, parts };
};
