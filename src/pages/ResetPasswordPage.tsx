import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, ShieldCheck } from "lucide-react";
import { getSupabase, extractErrorMessage } from "../lib/supabase";

interface ResetPasswordPageProps {
  setCurrentView: (view: string) => void;
}

export default function ResetPasswordPage({ setCurrentView }: ResetPasswordPageProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRecoveryActive, setIsRecoveryActive] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    // 1. Listen for Supabase PASSWORD_RECOVERY event
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setIsRecoveryActive(true);
        if (session?.user?.email) {
          setUserEmail(session.user.email);
        }
      }
    });

    // 2. Check current session or hash params
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsRecoveryActive(true);
        if (session.user?.email) {
          setUserEmail(session.user.email);
        }
      }
    });

    // Check if recovery tokens are present in window location
    if (typeof window !== "undefined") {
      const hash = window.location.hash || "";
      if (hash.includes("type=recovery") || hash.includes("access_token")) {
        setIsRecoveryActive(true);
      }
    }

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters in length.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter matching passwords.");
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabase();

      if (supabase) {
        // Securely update user password using Supabase Auth
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword
        });

        if (error) {
          throw new Error(extractErrorMessage(error, "Failed to update password. Your recovery link may have expired."));
        }

        const resolvedEmail = data?.user?.email || userEmail;
        if (resolvedEmail) {
          // Sync with local db cache
          try {
            await fetch("/api/auth/update-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: resolvedEmail, password: newPassword })
            });
          } catch (e) {}
        }

        setSuccessMessage("Your password has been reset successfully! Redirecting you to sign in...");

        // Auto-redirect to login page after 2.5 seconds
        setTimeout(() => {
          setCurrentView("account");
        }, 2500);

      } else {
        // Fallback for demo mode
        setSuccessMessage("Password reset completed successfully! Redirecting to sign in...");
        setTimeout(() => {
          setCurrentView("account");
        }, 2500);
      }

    } catch (err: any) {
      setErrorMessage(
        extractErrorMessage(
          err,
          "Failed to reset password. The reset link may have expired or been used already. Please request a new link."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50" id="reset-password-page">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 text-[#FF7A20] mb-3 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Create New Password
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            {userEmail ? (
              <span>Setting new password for <strong className="text-gray-800">{userEmail}</strong></span>
            ) : (
              "Please enter and confirm your new secure password."
            )}
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-start space-x-3 shadow-xs animate-shake" id="reset-error-alert">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-start space-x-3 shadow-xs" id="reset-success-alert">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5" id="form-reset-password-page">
            
            {/* New Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                  id="input-new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Must be at least 6 characters long.</p>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                  id="input-confirm-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || Boolean(successMessage)}
              className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3.5 rounded-xl text-sm font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              id="btn-submit-reset-password"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                <>
                  <span>Save New Password</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={() => setCurrentView("account")}
              className="text-xs sm:text-sm font-bold text-gray-600 hover:text-[#FF7A20] transition cursor-pointer"
              id="btn-goto-login-from-reset"
            >
              Back to Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
