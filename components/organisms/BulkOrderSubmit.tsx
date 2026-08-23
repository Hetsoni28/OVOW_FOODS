"use client";

import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";

interface BulkOrderSubmitProps {
  isSubmitting: boolean;
  submitError?: string;
}

export function BulkOrderSubmit({ isSubmitting, submitError }: BulkOrderSubmitProps) {
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        suppressHydrationWarning
        className="w-full mt-6 bg-[#25D366] text-white flex items-center justify-center gap-3 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1DA851] hover:scale-[1.02] transition-all shadow-lg disabled:opacity-70 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          "Sending Inquiry..."
        ) : (
          <>
            <WhatsAppIcon className="w-5 h-5" /> Enquire on WhatsApp
          </>
        )}
      </button>

      {submitError && (
        <p className="text-red-500 text-sm text-center mt-4">
          {submitError}
        </p>
      )}

      <p className="text-center text-xs text-primary/50 mt-4 uppercase tracking-widest font-bold">
        We typically respond within 30 minutes
      </p>
    </>
  );
}
