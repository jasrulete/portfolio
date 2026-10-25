/**
 * Plain left-aligned section heading. No accent rule and no text effect: the
 * brand keeps decoration for content that earns it (docs/brand.md §7).
 *
 * `className` replaces the bottom margin, for sections that put a sub-line
 * under the heading and own the rhythm themselves.
 */
export default function SectionHeading({
  title,
  className = "mb-8 sm:mb-10",
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl sm:text-3xl font-semibold tracking-tight text-ink ${className}`}
    >
      {title}
    </h2>
  );
}
