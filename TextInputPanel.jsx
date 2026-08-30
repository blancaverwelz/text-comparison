export default function TextInputPanel({ label, value, onChange, onClear, placeholder }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="font-serif text-sm font-semibold text-[#1C1B1A] dark:text-[#EDEAE3]">
          {label}
        </label>
        <button
          type="button"
          onClick={onClear}
          disabled={!value}
          className="font-sans text-xs text-[#6B6660] underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-40 dark:text-[#9A958D]"
        >
          Clear
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={10}
        className="w-full flex-1 resize-y rounded-sm border border-[#D8D4CC] bg-white p-3 font-mono text-sm text-[#1C1B1A] placeholder:text-[#A6A199] focus:border-[#2B4C7E] focus:outline-none focus:ring-1 focus:ring-[#2B4C7E] dark:border-[#3A3833] dark:bg-[#1E1C1A] dark:text-[#EDEAE3] dark:placeholder:text-[#6B6660] dark:focus:border-[#7FA8E0] dark:focus:ring-[#7FA8E0]"
      />
    </div>
  );
}
