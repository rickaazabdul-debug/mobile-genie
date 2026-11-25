"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(name, email, password);
      }
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setError(msg.replace("Firebase: ", ""));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed.";
      setError(msg.replace("Firebase: ", ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-white">
          {mode === "signin" ? "Welcome back to Mobile Genie" : "Create your Genie Account"}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {mode === "signin"
            ? "Track your repair tickets and manage your device orders."
            : "Sign up to book express repairs and save your order history."}
        </p>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-xs text-slate-400">
          {mode === "signin" ? "New to Mobile Genie?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
            }}
            className="font-semibold text-cyan-400 hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
