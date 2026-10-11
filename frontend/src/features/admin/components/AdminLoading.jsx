export default function AdminLoading({ label = "Loading workspace" }) {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center gap-5 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-16 w-20" aria-hidden="true">
        <span className="absolute bottom-1 left-2 h-3 w-16 -rotate-6 rounded-md border-2 border-cyan-200 bg-cyan-50 shadow-sm admin-load-card admin-load-card-one" />
        <span className="absolute bottom-3 left-2 h-3 w-16 rotate-3 rounded-md border-2 border-cyan-300 bg-white shadow-sm admin-load-card admin-load-card-two" />
        <span className="absolute bottom-5 left-2 h-3 w-16 -rotate-2 rounded-md border-2 border-cyan-500 bg-cyan-400 shadow-sm admin-load-card admin-load-card-three" />
        <span className="absolute -right-1 top-0 h-2 w-2 rounded-full bg-amber-400 admin-load-spark" />
        <span className="absolute left-1 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300 admin-load-spark admin-load-spark-delay" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="mt-1 text-xs text-slate-400">
          Getting your store ready
        </p>
      </div>
      <style>{`
        @keyframes admin-card-lift {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes admin-card-pop {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes admin-sparkle {
          0%, 100% { opacity: .25; transform: scale(.65); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .admin-load-card-one { animation: admin-card-lift 1.5s ease-in-out infinite; }
        .admin-load-card-two { animation: admin-card-pop 1.5s ease-in-out infinite .16s; }
        .admin-load-card-three { animation: admin-card-lift 1.5s ease-in-out infinite .32s; }
        .admin-load-spark { animation: admin-sparkle 1s ease-in-out infinite; }
        .admin-load-spark-delay { animation-delay: .4s; }
        @media (prefers-reduced-motion: reduce) {
          .admin-load-card, .admin-load-spark { animation: none; }
        }
      `}</style>
    </div>
  );
}
