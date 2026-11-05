export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D8D4CC] bg-[#FAF9F6] dark:border-[#3A3833] dark:bg-[#161513]">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center font-sans text-xs text-[#6B6660] dark:text-[#9A958D] sm:px-6">
        <p>&copy; {year} ProCompare. All Rights Reserved.</p>
        <p className="mt-1">
          Designed &amp; Developed by{" "}
          <a
            href="https://blancaver-studios.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#B23A3A]/50 underline-offset-2 hover:text-[#1C1B1A] dark:decoration-[#F87171]/50 dark:hover:text-[#EDEAE3]"
          >
            Blancaver Studios
          </a>
        </p>
      </div>
    </footer>
  );
}
