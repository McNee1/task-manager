import { useEffect, useState } from 'react';

interface UseClipboardOptions {
  onCopy?: () => void;
  successDuration?: number;
}

/**
 * Custom hook to handle clipboard operations.
 *
 * @param textToCopy - The text string to be copied to the clipboard.
 * @param options - Configuration options for clipboard behavior.
 * @param options.onCopy - Optional callback function executed after a successful copy.
 * @param options.successDuration - Time in milliseconds for which the copy success state is maintained.
 * @returns An object containing:
 *   - isCopied: A boolean indicating if the text was successfully copied.
 *   - copy: A function to trigger the copy operation.
 */

export const useClipboard = (textToCopy: string, options: UseClipboardOptions = {}) => {
  const { successDuration = 2000, onCopy } = options;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied && successDuration > 0) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isCopied, successDuration]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      onCopy?.();
      console.log(textToCopy, 'copied');
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      setIsCopied(false);
      return false;
    }
  };

  return { isCopied, handleCopy };
};
