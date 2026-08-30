import { getDiffStats } from '../lib/textDiff';

function DiffSegment({ segment, index }) {
  if (segment.type === 'added') {
    return (
      <ins
        key={index}
        className="rounded-[2px] bg-[#E4F2E9] text-[#1F7A4D] no-underline decoration-2 dark:bg-[#16261D] dark:text-[#4ADE80]"
      >
        {segment.value}
      </ins>
    );
  }
  if (segment.type === 'removed') {
    return (
      <del
        key={index}
        className="rounded-[2px] bg-[#F7E5E3] text-[#B23A3A] decoration-2 dark:bg-[#2A1616] dark:text-[#F87171]"
      >
        {segment.value}
      </del>
    );
  }
  return (
    <span key={index} className="text-[#1C1B1A] dark:text-[#EDEAE3]">
      {segment.value}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[10rem] flex-col items-center justify-center gap-1 text-center">
      <p className="font-serif text-base text-[#1C1B1A] dark:text-[#EDEAE3]">
        Nothing compared yet
      </p>
      <p className="font-sans text-sm text-[#6B6660] dark:text-[#9A958D]">
        Add your original and changed text, then press Compare.
      </p>
    </div>
  );
}

function MissingInputState() {
  return (
    <div className="flex min-h-[10rem] flex-col items-center justify-center gap-1 text-center">
      <p className="font-serif text-base text-[#B23A3A] dark:text-[#F87171]">
        Both panels need text
      </p>
      <p className="font-sans text-sm text-[#6B6660] dark:text-[#9A958D]">
        Fill in both Original Text and Changed Text before comparing.
      </p>
    </div>
  );
}

export default function CompareResult({ status, diff }) {
  return (
    <div className="rounded-sm border border-[#D8D4CC] bg-white p-4 dark:border-[#3A3833] dark:bg-[#1E1C1A] sm:p-6">
      {status === 'idle' && <EmptyState />}
      {status === 'missing' && <MissingInputState />}
      {status === 'result' && diff && (
        <div>
          {(() => {
            const stats = getDiffStats(diff);
            return (
              <p className="mb-4 font-sans text-xs uppercase tracking-wide text-[#6B6660] dark:text-[#9A958D]">
                <span className="text-[#1F7A4D] dark:text-[#4ADE80]">+{stats.added} added</span>
                {'  '}&middot;{'  '}
                <span className="text-[#B23A3A] dark:text-[#F87171]">-{stats.removed} removed</span>
              </p>
            );
          })()}
          <pre className="whitespace-pre-wrap break-words border-l-2 border-[#D8D4CC] pl-4 font-mono text-sm leading-relaxed dark:border-[#3A3833]">
            {diff.map((segment, index) => (
              <DiffSegment key={index} segment={segment} index={index} />
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
