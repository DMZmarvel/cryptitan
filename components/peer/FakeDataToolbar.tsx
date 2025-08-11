type Props = {
  onLoad: () => void;
  onClear: () => void;
};
export default function FakeDataToolbar({ onLoad, onClear }: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onLoad}
        className="h-9 px-3 rounded-lg bg-white/10 text-white text-sm"
      >
        Load sample data
      </button>
      <button
        onClick={onClear}
        className="h-9 px-3 rounded-lg bg-[#111827] border border-white/10 text-sm"
      >
        Clear
      </button>
    </div>
  );
}
