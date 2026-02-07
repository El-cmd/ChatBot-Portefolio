import { FileText, Github, Globe, Linkedin, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { UiBlock, UiButton, UiFile, UiImage } from "@/lib/chat/parse-ui-blocks";

type UiButtonsProps = {
  buttons: UiButton[];
};

type UiImageProps = UiImage;

type UiFileProps = UiFile;

export function UiButtons({ buttons }: UiButtonsProps) {
  const icons: Record<string, typeof Linkedin> = {
    linkedin: Linkedin,
    github: Github,
    mail: Mail,
    phone: Phone,
    globe: Globe,
    file: FileText
  };

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button) => {
        const Icon = button.icon ? icons[button.icon] : undefined;
        return (
          <Button
            key={`${button.label}-${button.url}`}
            asChild
            variant={button.style === "primary" ? "default" : "secondary"}
            size="sm"
            className="rounded-full px-4"
          >
            <a href={button.url} target="_blank" rel="noreferrer">
              {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
              {button.label}
            </a>
          </Button>
        );
      })}
    </div>
  );
}

export function UiImage({ url, alt, caption }: UiImageProps) {
  return (
    <figure className="space-y-2">
      <img src={url} alt={alt ?? ""} className="w-full rounded-xl border border-border/60" />
      {caption ? <figcaption className="text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}

export function UiFile({ label, url }: UiFileProps) {
  return (
    <Card className="flex items-center justify-between gap-3 border-border/60 bg-background/70 px-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">Fichier a telecharger</p>
      </div>
      <Button asChild variant="outline" size="sm">
        <a href={url} target="_blank" rel="noreferrer">
          Telecharger
        </a>
      </Button>
    </Card>
  );
}

export const renderUiBlock = (block: UiBlock) => {
  switch (block.type) {
    case "buttons":
      return <UiButtons buttons={block.data.buttons} />;
    case "image":
      return <UiImage {...block.data} />;
    case "file":
      return <UiFile {...block.data} />;
    default:
      return null;
  }
};
