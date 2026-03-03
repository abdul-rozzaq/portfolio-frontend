/**
 * BackgroundPattern
 * A subtle, GPU-friendly grid pattern overlay for the entire page.
 * Uses a CSS SVG data-URI background — no canvas, no JS, zero runtime cost.
 */
export function BackgroundPattern() {
  return (
    <>
      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(91,121,200,0.12) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Radial vignette so edges fade to background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #0b0f1a 100%)",
        }}
      />
    </>
  );
}
