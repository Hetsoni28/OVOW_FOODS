"use client";

// Last-resort error UI when the root layout itself fails. Must render its own
// <html>/<body> and can't rely on globals.css, so styles are inline.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9F6F0", color: "#123B2A", fontFamily: "system-ui, sans-serif" }}>
        <main role="alert" style={{ textAlign: "center", padding: 24, maxWidth: 420 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, margin: "0 0 12px" }}>OVOW FOODS</h1>
          <p style={{ margin: "0 0 24px", lineHeight: 1.5 }}>Something went wrong while loading the site. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            style={{ background: "#123B2A", color: "#fff", border: 0, padding: "14px 28px", minHeight: 44, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 12, cursor: "pointer" }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
