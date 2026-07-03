"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "@/features/auth/actions/authActions";

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await loginAction(email, password, rememberMe);

      if (!result.success) {
        setError(result.error);
        return;
      }

      const callbackUrl = searchParams.get("callbackUrl");
      router.replace(callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007ee1",
        backgroundImage:
          "linear-gradient(to top right, #007ee1 0%, #00b4d8 100%)",
        padding: "1.5rem",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "32px",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          width: "100%",
          maxWidth: "1100px",
          aspectRatio: isMobile ? "auto" : "16/9",
          maxHeight: "100%",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div
          style={{
            flex: "4",
            padding: "3rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: "340px", margin: "0 auto", width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <img
                src="/images/logos/unity11-logo.gif"
                alt="Unity11 Logo"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  margin: "0 auto 1.25rem auto",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                }}
              />
              <h1
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "0.5rem",
                  fontFamily: "var(--font-comfortaa), sans-serif",
                }}
              >
                Admin Portal
              </h1>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Secure access for Unity11 administrators.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {error && (
                <div
                  role="alert"
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    fontSize: "0.8125rem",
                    fontWeight: "500",
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "0.875rem 2.5rem 0.875rem 1.25rem",
                    borderRadius: "9999px",
                    border: "1px solid #e5e7eb",
                    fontSize: "0.875rem",
                    outline: "none",
                    color: "#111827",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#007ee1";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                >
                  <svg
                    style={{ width: "1rem", height: "1rem" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "0.875rem 2.5rem 0.875rem 1.25rem",
                    borderRadius: "9999px",
                    border: "1px solid #e5e7eb",
                    fontSize: "0.875rem",
                    outline: "none",
                    color: "#111827",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#007ee1";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  <svg
                    style={{ width: "1rem", height: "1rem" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  marginTop: "0.25rem",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isSubmitting}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                  <span style={{ color: "#4b5563" }}>Remember for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  borderRadius: "9999px",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  backgroundColor: isSubmitting ? "#60a5fa" : "#007ee1",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  marginTop: "0.5rem",
                  boxShadow: "0 4px 14px 0 rgba(0, 126, 225, 0.39)",
                }}
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </form>
          </div>
        </div>

        {!isMobile && (
          <div style={{ flex: "3", padding: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <img
                src="/admin-login-bg.jpg"
                alt="Login Background"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "32px",
                  backgroundColor: "#00b4d8",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
