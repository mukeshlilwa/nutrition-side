/** Matches site-wide hero gradient — static, no animation. */
export function CalculatorBackground() {
  return (
    <>
      <div className="bg-gradient-hero pointer-events-none fixed inset-0 -z-10" aria-hidden />
      <div className="hero-grid-pattern pointer-events-none fixed inset-0 -z-10 opacity-70" aria-hidden />
    </>
  );
}
