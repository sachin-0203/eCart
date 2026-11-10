import {
  ArrowLeft,
  Loader,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function LoginStages({
  stage,
  headerText,
  identifier,
  setIdentifier,
  onIdentifierSubmit,
  loading,
  onReset,
  maskEmail,
  otp,
  setOtp,
  onOtpVerify,
  verifyingOtp,
  onResendOTP,
  onPasswordBack,
  isNewUser,
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onCreateAccount,
  creatingAccount,
  onContinue,
}) {
  return (
    <>
      {stage === "identifier" && (
        <>
          <h2 className="text-xl font-bold text-primary">{headerText}</h2>

          <p className="text-sm text-text-secondary">
            Use your email address to continue.
          </p>

          <form
            className="space-y-4 text-primary"
            onSubmit={onIdentifierSubmit}
          >
            <div className="relative">
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                maxLength={254}
                placeholder=" "
                className="peer w-full rounded-md border border-border-color bg-surface p-2.5 text-sm text-primary outline-none focus:border-primary"
              />

              <label
                htmlFor="identifier"
                className={`pointer-events-none absolute left-2 px-1 text-sm text-text-secondary transition-all
                bg-surface
                ${
                  identifier
                    ? "-top-2.5 text-xs bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                    : "top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                }
                peer-focus:text-primary`}
              >
                Email
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? (
                <Loader size={18} className="mx-auto animate-spin" />
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </>
      )}

      {stage === "otp" && (
        <>
          <div className="mb-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary"
              aria-label="Back"
            >
              <ArrowLeft size={16} />
            </button>

            <p className="text-sm text-text-secondary">Back</p>
          </div>

          <h2 className="text-xl font-bold text-primary">{headerText}</h2>

          <p className="mt-1 text-sm text-text-secondary">
            We sent a verification code to {maskEmail(identifier)}.
          </p>

          <form className="mt-4 space-y-4 text-primary" onSubmit={onOtpVerify}>
            <div className="relative">
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder=" "
                className="peer w-full rounded-md border border-border-color bg-surface p-2.5 text-sm text-primary outline-none focus:border-primary"
              />

              <label
                htmlFor="otp"
                className={`pointer-events-none absolute left-2 px-1 text-sm text-text-secondary transition-all
                bg-surface
                ${
                  otp
                    ? "-top-2.5 text-xs bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                    : "top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                }
                peer-focus:text-primary`}
              >
                OTP code
              </label>
            </div>

            <button
              type="submit"
              disabled={verifyingOtp}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-75"
            >
              {verifyingOtp ? (
                <Loader size={18} className="mx-auto animate-spin" />
              ) : (
                "Verify code"
              )}
            </button>
            <button
              type="button"
              onClick={onResendOTP}
              disabled={loading || verifyingOtp}
              className="w-full text-center text-sm font-semibold text-primary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending a new code..." : "Resend code"}
            </button>
          </form>
        </>
      )}

      {stage === "password" && (
        <>
          <div className="mb-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onPasswordBack}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary"
              aria-label="Back"
            >
              <ArrowLeft size={16} />
            </button>

            <p className="text-sm text-text-secondary">Back</p>
          </div>

          {isNewUser ? (
            <>
              <h2 className="text-xl font-bold text-primary">
                Set your password
              </h2>

              <p className="mb-4 text-sm text-text-secondary">
                Finish creating your account for {maskEmail(identifier)}.
              </p>

              <form
                className="space-y-4 text-primary"
                onSubmit={onCreateAccount}
              >
                {/* Username */}
                <div className="relative">
                  <input
                    id="newUsername"
                    type="text"
                    value={newUsername}
                    onChange={(event) => setNewUsername(event.target.value)}
                    placeholder=" "
                    className="peer w-full rounded-md border border-border-color bg-surface p-2.5 text-sm text-primary outline-none focus:border-primary"
                  />

                  <label
                    htmlFor="newUsername"
                    className={`pointer-events-none absolute left-2 px-1 text-sm text-text-secondary transition-all
                    bg-surface
                    ${
                      newUsername
                        ? "-top-2.5 text-xs bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                        : "top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                    }
                    peer-focus:text-primary`}
                  >
                    Username
                  </label>
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder=" "
                    className="peer w-full rounded-md border border-border-color bg-surface p-2.5 text-sm text-primary outline-none focus:border-primary"
                  />

                  <label
                    htmlFor="newPassword"
                    className={`pointer-events-none absolute left-2 px-1 text-sm text-text-secondary transition-all
                    bg-surface
                    ${
                      newPassword
                        ? "-top-2.5 text-xs bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                        : "top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                    }
                    peer-focus:text-primary`}
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder=" "
                    className="peer w-full rounded-md border border-border-color bg-surface p-2.5 text-sm text-primary outline-none focus:border-primary"
                  />

                  <label
                    htmlFor="confirmPassword"
                    className={`pointer-events-none absolute left-2 px-1 text-sm text-text-secondary transition-all
                    bg-surface
                    ${
                      confirmPassword
                        ? "-top-2.5 text-xs bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                        : "top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[linear-gradient(to_bottom,white_65%,theme(colors.surface)_35%)]"
                    }
                    peer-focus:text-primary`}
                  >
                    Confirm password
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={creatingAccount}
                  className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {creatingAccount ? (
                    <Loader size={18} className="mx-auto animate-spin" />
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center rounded-xl bg-surface p-3 text-sm text-text-secondary">
                <ShieldCheck size={16} className="mr-2 text-primary" />
                Your account is verified successfully.
              </div>

              <div className="rounded-xl border border-border-color bg-surface p-4 text-sm text-primary">
                <div className="mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  <span>{maskEmail(identifier)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <LockKeyhole size={16} className="text-primary" />
                  <span>Secure access enabled</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onContinue}
                disabled={verifyingOtp}
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-75"
              >
                {verifyingOtp ? (
                  <Loader size={18} className="mx-auto animate-spin" />
                ) : (
                  "Continue to account"
                )}
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
