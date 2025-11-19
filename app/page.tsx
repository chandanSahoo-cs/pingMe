"use client";

import { useEffect, useState } from "react";
import { BotIcon, BotOffIcon, Eye, EyeClosed, EyeIcon, Trash2Icon } from "lucide-react";
import { getSites } from "@/lib/gitStorage";
import { Loader } from "@/components/Loader";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface GistFuncWrapperType {
  url: string;
  link: string;
  type: "add" | "remove";
}

export default function Home() {
  const [apps, setApps] = useState<string[]>([]);
  const [link, setLink] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isPasswordDialog, setIsPasswordDialog] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const gistFuncWrapper = async ({ url, link, type }: GistFuncWrapperType) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });

      if (!res.ok) throw new Error("Failed to perform the action");

      if (type == "add") {
        toast.success("Added, daddy!");
      } else {
        toast.error("Removed, daddy!");
      }

      return res;
    } catch {
      if (type == "add") {
        toast.error("Oh no cutie! Failed to add the link");
      } else {
        toast.error("Oh no cutie! Failed to remove the link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addApp = () => {
    if (link.trim() && !apps.includes(link.trim())) {
      gistFuncWrapper({ url: "/api/sites/add", link, type: "add" });
      setLink("");
    }
  };

  const removeApp = (app: string) => {
    gistFuncWrapper({ url: "/api/sites/remove", link: app, type: "remove" });
  };

  const checkPasswordAndAdd = () => {
    console.log(isPasswordDialog);
    const check = async () => {
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          body: JSON.stringify({ password }),
        });

        if (!res.ok) throw new Error("Unauthorized");
        addApp();
      } catch (error) {
        if ((error as Error).message === "Unauthorized") {
          toast.error("Get lost UwU!");
        }
      } finally {
        setIsPasswordDialog(false);
        setPassword("");
      }
    };

    check();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsPasswordDialog(true);
    }
  };

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      try {
        const sites = await getSites();
        setApps(sites);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    get();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Dialog open={isPasswordDialog} onOpenChange={setIsPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Password</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 justify-center items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  checkPasswordAndAdd();
                }
              }}
              placeholder="Enter password"
              className="w-full p-4 bg-background border-3 border-secondary text-foreground placeholder-muted-foreground font-mono text-lg focus:outline-none focus:border-accent focus:ring-4 focus:ring-primary/30 resize-none h-20 rounded-2xl"
            />
            <Button
              className="h-15 w-15 p-4"
              onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <BotIcon className="size-10" />
              ) : (
                <BotOffIcon className="size-8" />
              )}
            </Button>
          </div>
          <button
            onClick={checkPasswordAndAdd}
            className="mt-4 w-full bg-primary text-primary-foreground px-6 py-4 font-black text-lg uppercase tracking-widest border-3 border-primary hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-all transform hover:scale-105 active:scale-95 rounded-2xl">
            Verify
          </button>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-background p-8 md:p-16 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-2  bg-clip-text text-[#00ffff] from-primary to-secondary">
              LINKS
            </h1>
            <div className="h-2 w-32 bg-accent rounded-full"></div>
          </div>

          <div className="mb-12 border-4 border-primary p-8 bg-card rounded-3xl">
            <label className="block text-sm font-black uppercase tracking-widest text-primary mb-4">
              Add Your App
            </label>
            <textarea
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://your-app.com"
              className="w-full p-4 bg-background border-3 border-secondary text-foreground placeholder-muted-foreground font-mono text-lg focus:outline-none focus:border-accent focus:ring-4 focus:ring-primary/30 resize-none h-20 rounded-2xl"
            />
            <button
              onClick={() => {
                setIsPasswordDialog(true);
                console.log(isPasswordDialog);
              }}
              className="mt-4 w-full bg-primary text-primary-foreground px-6 py-4 font-black text-lg uppercase tracking-widest border-3 border-primary hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-all transform hover:scale-105 active:scale-95 rounded-2xl">
              + Add Link
            </button>
          </div>

          {apps.length > 0 && (
            <div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-secondary mb-6">
                Your Links ({apps.length})
              </h2>
              <div className="grid gap-4 md:gap-6">
                {apps.map((app, index) => (
                  <div
                    key={index}
                    className="border-4 border-secondary bg-card p-6 group hover:border-accent hover:bg-background transition-all transform hover:translate-x-2 rounded-2xl">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-primary uppercase tracking-widest mb-2">
                          Link #{index + 1}
                        </p>
                        <a
                          href={app}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground font-mono break-all hover:text-accent transition-colors underline text-lg">
                          {app}
                        </a>
                      </div>
                      <button
                        onClick={() => removeApp(app)}
                        className=" shrink-0 p-3 bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-destructive hover:border-destructive hover:scale-110 transition-all transform active:scale-95 rounded-xl"
                        aria-label="Delete link">
                        <Trash2Icon size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {apps.length === 0 && (
            <div className="border-4 border-dashed border-muted p-12 text-center rounded-2xl">
              <p className="text-xl font-black uppercase tracking-widest text-muted-foreground">
                No links yet. Add one to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
