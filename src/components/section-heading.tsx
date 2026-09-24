import DecryptedText from "./decrypted-text";

/**
 * Left-aligned section heading with a 32x2px accent rule.
 *
 * `DecryptedText` stays: it ships the real string as `sr-only` content with
 * the scrambling copy `aria-hidden`, which is the accessibility fix from an
 * earlier pass — do not collapse it back to plain text.
 *
 * `className` overrides only the wrapper's bottom margin, for the two sections
 * that put a sub-line under the heading and own the rhythm themselves.
 */
export default function SectionHeading({
  title,
  className = "mb-8 sm:mb-10",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        <DecryptedText text={title} trigger="view" speed={30} />
      </h2>
      <div className="mt-3 w-8 h-0.5 bg-blue-600" aria-hidden />
    </div>
  );
}
