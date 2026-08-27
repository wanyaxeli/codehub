'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Check, X, Link2 } from 'lucide-react';

interface ReferralPopupProps {
  /** The student's unique referral code, e.g. "BILLY24" */
  refCode: string;
  /** Called when the popup is dismissed */
  onClose?: () => void;
  /** Base registration URL — defaults to CodingScholar's */
  baseUrl?: string;
}

/**
 * ReferralPopup
 * Shown once per login. Presents the student's referral link as a
 * copyable "code snippet" — a nod to CodingScholar's subject matter —
 * with a clear reward: 3 free classes once a referred student
 * completes 2 modules (16 classes).
 *
 * Usage:
 *   <ReferralPopup refCode={user.ref_code} />
 *
 * The parent decides *when* to mount this (e.g. once per session after
 * login), typically gated with a flag in your own session/localStorage logic.
 */
export default function ReferralPopup({
  refCode,
  onClose,
  baseUrl = 'https://www.codingscholar.com/register',
}: ReferralPopupProps) {
  const [visible, setVisible] = useState(false);
  const [copiedField, setCopiedField] = useState<'link' | 'code' | null>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const referralLink = `${baseUrl}?ref=${refCode}`;

  // Appears shortly after mount — i.e. right after login
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  };

  const handleCopy = async (field: 'link' | 'code') => {
    await copyToClipboard(field === 'link' ? referralLink : refCode);
    setCopiedField(field);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center !px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 !bg-[#101828]/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="referral-popup-title"
            className="relative w-full max-w-md rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(16,24,40,0.25)] ring-1 ring-[#EAECF0] overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute !right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#98A2B3] transition-colors hover:bg-[#F9FAFB] hover:text-[#475467]"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="!px-7 !pb-7 !pt-8">
              {/* Eyebrow */}
              <div className="!mb-4 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: '#0097B2' }}
                />
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#667085]">
                  Referral
                </span>
              </div>

              {/* Headline */}
              <h2
                id="referral-popup-title"
                className="text-[21px] font-semibold leading-snug tracking-tight text-[#101828]"
              >
                Share CodingScholar, earn free classes
              </h2>
              <p className="!mt-2 text-[14px] leading-relaxed text-[#667085]">
                Send your link to a friend. Once they sign up and complete 2
                modules, you both move forward.
              </p>

              {/* Reward pill */}
              <div
                className="!mt-4 inline-flex items-center gap-1.5 rounded-full !px-3 !py-1.5 text-[13px] font-medium"
                style={{
                  backgroundColor: 'rgba(210, 65, 19, 0.08)',
                  color: '#D24113',
                }}
              >
                <span>3 free classes</span>
                <span className="text-[#D24113]/50">·</span>
                <span className="text-[#D24113]/80">
                  after 16 classes completed
                </span>
              </div>

              {/* Link "snippet" block */}
              <div className="!mt-6">
                <div className="!mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
                  <Link2 className="h-3 w-3" strokeWidth={2.5} />
                  Your link
                </div>

                <div
                  className="flex items-center gap-2 rounded-xl border bg-[#F9FAFB] !py-2.5 !pl-3.5 !pr-2"
                  style={{ borderColor: '#EAECF0' }}
                >
                  <a
                    href={referralLink}
                    onClick={(e) => e.stopPropagation()}
                    className="min-w-0 flex-1 truncate font-mono !text-[13px] !text-[#0097B2] transition-colors hover:text-[#007A91]"
                    title={referralLink}
                  >
                    {baseUrl.replace('https://', '')}?ref=
                    <span className="font-semibold" style={{ color: '#D24113' }}>
                      {refCode}
                    </span>
                  </a>

                  <button
                    onClick={() => handleCopy('link')}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg !px-3 !py-1.5 text-[13px] font-medium text-white transition-all active:scale-[0.97]"
                    style={{
                      backgroundColor: copiedField === 'link' ? '#0E7C90' : '#0097B2',
                    }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedField === 'link' ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-1.5"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          Copied
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy className="h-3.5 w-3.5" strokeWidth={2.5} />
                          Copy link
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* Referral code block */}
              <div className="!mt-4">
                <div className="!mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ backgroundColor: 'rgba(210, 65, 19, 0.15)' }}
                  />
                  Your code
                </div>

                <div
                  className="flex items-center gap-2 rounded-xl border !py-2.5 !pl-3.5 !pr-2"
                  style={{ borderColor: '#EAECF0', backgroundColor: 'rgba(210, 65, 19, 0.04)' }}
                >
                  <span
                    className="min-w-0 flex-1 truncate font-mono text-[14px] font-semibold tracking-wide"
                    style={{ color: '#D24113' }}
                  >
                    {refCode}
                  </span>

                  <button
                    onClick={() => handleCopy('code')}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg !px-3 !py-1.5 text-[13px] font-medium text-white transition-all active:scale-[0.97]"
                    style={{
                      backgroundColor: copiedField === 'code' ? '#A6350F' : '#D24113',
                    }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedField === 'code' ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-1.5"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          Copied
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy className="h-3.5 w-3.5" strokeWidth={2.5} />
                          Copy code
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* Footer note */}
              <p className="!mt-5 text-[12px] text-[#98A2B3]">
                You can find this link anytime from your dashboard.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}