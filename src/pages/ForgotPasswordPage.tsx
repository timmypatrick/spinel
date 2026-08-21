import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, ArrowLeft, Shield } from "lucide-react";
import { getSupabase, extractErrorMessage } from "../lib/supabase";

interface ForgotPasswordPageProps {
  setCurrentView: (view: string) => void;
}

export default function ForgotPasswordPage({ setCurrentView }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const emailTrimmed = email.toLowerCase().trim();
    if (!emailTrimmed || !emailTrimmed.includes("@")) {
      setErrorMessage("Please enter a valid registered email address.");
      return;
    }

    setLoading(true);

    try {
      // 1. Direct Supabase Auth resetPasswordForEmail
      const supabase = getSupabase();
      const redirectUrl = `${window.location.origin}/reset-password`;

      if (supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(emailTrimmed, {
          redirectTo: redirectUrl
        });

        if (error) {
          throw new Error(extractErrorMessage(error, "Could not send password reset email. Please verify your email."));
        }

        setSuccessMessage(
          `Password reset instructions have been sent to ${emailTrimmed}. Please check your inbox and click the link to reset your password.`
        );
      } else {
        // 2. Server API fallback for environments without client key
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailTrimmed })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to process password reset request.");
        }

        setSuccessMessage(
          data.message || `Password reset instructions have been sent to ${emailTrimmed}. Please check your email.`
        );
      }
    } catch (err: any) {
      setErrorMessage(
        extractErrorMessage(err, "Failed to send password reset email. Please verify your email and try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50" id="forgot-password-page">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 text-[#FF7A20] mb-3 shadow-xs">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Enter your registered email address and we'll send you a secure link to create a new password.
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-start space-x-3 shadow-xs animate-shake" id="forgot-error-alert">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-start space-x-3 shadow-xs" id="forgot-success-alert">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5" id="form-forgot-password-page">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A20] focus:border-transparent transition"
                  id="input-forgot-page-email"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl text-[11px] sm:text-xs text-blue-900 leading-relaxed">
              <strong>Note:</strong> The password reset link will redirect you securely to the Reset Password page. Ensure you open the link in this browser.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7A20] hover:bg-[#e06816] text-white py-3.5 rounded-xl text-sm font-bold transition duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              id="btn-submit-forgot-page"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                <>
                  <span>Send Password Reset Link</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={() => setCurrentView("account")}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-[#FF7A20] transition cursor-pointer"
              id="btn-back-to-login-link"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
