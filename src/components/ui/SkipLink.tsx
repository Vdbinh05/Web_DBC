export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sam-focus sr-only z-(--sam-z-overlay) rounded-sam-sm bg-sam-surface px-4 py-3 font-semibold text-sam-action focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
    >
      Chuyển đến nội dung chính
    </a>
  );
}
