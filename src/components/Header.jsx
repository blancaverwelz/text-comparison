export default function Header() {
  return (
    <header className="border-b border-[#D8D4CC] bg-[#FAF9F6] dark:border-[#3A3833] dark:bg-[#161513]">
      <div className="mx-auto flex max-w-5xl items-baseline gap-3 px-4 py-6 sm:px-6">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#1C1B1A] dark:text-[#EDEAE3] sm:text-3xl">
          ProCompare
        </h1>
        <p className="font-sans text-sm text-[#6B6660] dark:text-[#9A958D]">
          see what changed, word for word
        </p>
      </div>
    </header>
  );
}
