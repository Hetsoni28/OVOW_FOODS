"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitReviewAction } from "@/actions/submitReview";
import { Button } from "@/components/atoms/Button";

export function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const result = await submitReviewAction({ name, rating, comment });

    if (result.success) {
      setStatus("success");
      setName("");
      setComment("");
      setRating(5);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to submit review. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start py-8">
        <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-6 rounded-full">
          <Star className="fill-current" size={28} />
        </div>
        <h3 className="font-serif text-3xl text-primary mb-2">Thank you!</h3>
        <p className="text-primary/70">
          Your review has been successfully published to the site!
        </p>
        <button suppressHydrationWarning 
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-bold uppercase tracking-widest text-[#2E7D4F] hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3 className="font-serif text-3xl text-primary mb-2">Leave a Review</h3>
      <p className="text-primary/60 text-sm mb-8">Share your OVOW experience with the world.</p>
      
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-primary/70 mb-3">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button suppressHydrationWarning
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star 
                size={28} 
                className={`${
                  star <= (hoveredRating || rating) 
                    ? "fill-[#C9A24A] text-[#C9A24A]" 
                    : "fill-transparent text-primary/20"
                } transition-colors`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-primary/70 mb-2">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white border border-primary/20 px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
          placeholder="Jane Doe"
          suppressHydrationWarning
        />
      </div>

      <div className="mb-8">
        <label htmlFor="comment" className="block text-xs font-bold uppercase tracking-widest text-primary/70 mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          required
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-white border border-primary/20 px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors resize-none"
          placeholder="The food was absolutely incredible..."
          suppressHydrationWarning
        />
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm border border-red-100">
          {errorMessage}
        </div>
      )}

      <Button suppressHydrationWarning
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
