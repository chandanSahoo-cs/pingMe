"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group font-sans bg-[#0d0d0d] text-foreground border-2 border-primary rounded-2xl p-4 shadow-[4px_4px_0px_0px_#00ffff] backdrop-blur-md transition-all",
          title: "font-black tracking-wider uppercase text-sm text-foreground",
          description: "font-mono text-xs text-muted-foreground mt-0.5",
          actionButton:
            "!bg-primary !text-primary-foreground font-black uppercase text-xs tracking-widest px-3.5 py-1.5 rounded-xl !border-2 !border-primary hover:!bg-secondary hover:!border-secondary hover:!text-secondary-foreground transition-all transform active:scale-95 cursor-pointer",
          cancelButton:
            "!bg-muted !text-foreground font-bold uppercase text-xs tracking-wider px-3.5 py-1.5 rounded-xl !border-2 !border-border hover:!bg-accent hover:!text-accent-foreground transition-all cursor-pointer",
          closeButton:
            "!bg-[#141414] !text-muted-foreground hover:!text-white !border-2 !border-border hover:!border-secondary hover:!bg-secondary !rounded-xl transition-all",
          success:
            "!border-primary !bg-[#0d0d0d] !text-foreground shadow-[4px_4px_0px_0px_#00ffff]",
          error:
            "!border-secondary !bg-[#0d0d0d] !text-foreground shadow-[4px_4px_0px_0px_#ff006e]",
          warning:
            "!border-accent !bg-[#0d0d0d] !text-foreground shadow-[4px_4px_0px_0px_#ffff00]",
          info:
            "!border-primary !bg-[#0d0d0d] !text-foreground shadow-[4px_4px_0px_0px_#00ffff]",
          loading:
            "!border-accent !bg-[#0d0d0d] !text-foreground shadow-[4px_4px_0px_0px_#ffff00]",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-5 text-primary shrink-0" />,
        info: <InfoIcon className="size-5 text-primary shrink-0" />,
        warning: <TriangleAlertIcon className="size-5 text-accent shrink-0" />,
        error: <OctagonXIcon className="size-5 text-secondary shrink-0" />,
        loading: (
          <Loader2Icon className="size-5 text-primary animate-spin shrink-0" />
        ),
      }}
      style={
        {
          "--normal-bg": "#0d0d0d",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--primary)",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
