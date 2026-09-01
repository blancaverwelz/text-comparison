import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextInputPanel from '../components/TextInputPanel';
import CompareResult from '../components/CompareResult';
import { compareTexts } from '../lib/textDiff';

export default function Home() {
  const [originalText, setOriginalText] = useState('');
  const [changedText, setChangedText] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'missing' | 'result'
  const [diff, setDiff] = useState(null);

  const handleCompare = () => {
    if (!originalText.trim() || !changedText.trim()) {
      setStatus('missing');
      setDiff(null);
      return;
    }
    setDiff(compareTexts(originalText, changedText));
    setStatus('result');
  };

  const handleClearOriginal = () => {
    setOriginalText('');
    setStatus('idle');
    setDiff(null);
  };

  const handleClearChanged = () => {
    setChangedText('');
    setStatus('idle');
    setDiff(null);
  };

  const handleChangeOriginal = (value) => {
    setOriginalText(value);
    if (status !== 'idle') setStatus('idle');
  };

  const handleChangeChanged = (value) => {
    setChangedText(value);
    if (status !== 'idle') setStatus('idle');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] dark:bg-[#161513]">
      <Header />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <TextInputPanel
            label="Original Text"
            value={originalText}
            onChange={handleChangeOriginal}
            onClear={handleClearOriginal}
            placeholder="Paste the original text here..."
          />
          <TextInputPanel
            label="Changed Text"
            value={changedText}
            onChange={handleChangeChanged}
            onClear={handleClearChanged}
            placeholder="Paste the changed text here..."
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCompare}
            className="rounded-sm bg-[#2B4C7E] px-6 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-[#223e68] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] focus:ring-offset-2 dark:bg-[#7FA8E0] dark:text-[#161513] dark:hover:bg-[#6b96d1] dark:focus:ring-[#7FA8E0] dark:focus:ring-offset-[#161513]"
          >
            Compare
          </button>
        </div>

        <CompareResult status={status} diff={diff} />
      </main>

      <Footer />
    </div>
  );
}
