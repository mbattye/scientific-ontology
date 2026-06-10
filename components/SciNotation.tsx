/** Renders a number in scientific notation (e.g. 6.63 × 10⁻³⁴). */
export function SciNotation({ value }: { value: number }) {
  if (value === 0) return <>0</>;
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;
  const mantissaText =
    Math.abs(mantissa - 1) < 0.05 ? "" : `${mantissa.toFixed(2)} × `;
  return (
    <>
      {mantissaText}10<sup>{exponent}</sup>
    </>
  );
}
