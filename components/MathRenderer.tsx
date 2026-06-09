import katex from "katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  latex: string;
  display?: boolean;
  className?: string;
}

/**
 * Renders a LaTeX string with KaTeX. Server-compatible (no hooks) so it can be
 * used directly inside React Server Components.
 */
export function MathRenderer({ latex, display, className }: MathRendererProps) {
  let html: string;
  try {
    html = katex.renderToString(latex, {
      displayMode: !!display,
      throwOnError: false,
      strict: false,
      output: "htmlAndMathml",
    });
  } catch {
    html = latex;
  }

  return (
    <span
      className={className}
      // KaTeX output is trusted (we author all LaTeX in the content layer).
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
