// Renders `**highlighted**` segments of a string as emphasized text.
export default function Rich({ text, strongClass = 'font-medium text-ink' }) {
  return text.split('**').map((part, i) =>
    i % 2 ? (
      <strong key={i} className={strongClass}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
