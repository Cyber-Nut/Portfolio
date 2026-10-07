import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';

const STYLES = {
  success: { icon: 'check', ring: 'border-teal/40', text: 'text-teal' },
  error: { icon: 'alert', ring: 'border-red-400/40', text: 'text-red-300' },
  info: { icon: 'mail', ring: 'border-flutter/40', text: 'text-flutter' },
};

/** `toast` = { id, type: 'success' | 'error' | 'info', message } or null */
export default function Toast({ toast, onClose, duration = 5000 }) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [toast, onClose, duration]);

  const style = toast ? STYLES[toast.type] : null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className={`glass pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-2xl ${style.ring}`}
          >
            <Icon name={style.icon} className={`mt-0.5 size-5 shrink-0 ${style.text}`} />
            <p className="text-ink">{toast.message}</p>
            <button type="button" onClick={onClose} className="ml-2 text-muted hover:text-ink" aria-label="Dismiss">
              <Icon name="x" className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
