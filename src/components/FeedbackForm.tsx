import React, { useState } from "react";
import { createFeedback } from "@/lib/firebaseClient";
import { toast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

interface FeedbackFormProps {
  onSubmitSuccess: () => void;
}

export default function FeedbackForm({ onSubmitSuccess }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createFeedback({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        rating: Number(rating),
      });

      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);

      // Notify parent to reload feedbacks
      onSubmitSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please check your Firebase configuration.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          placeholder="Share your thoughts..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-field min-h-[120px] resize-none"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="rating" className="block text-sm font-medium text-foreground">
          Rating
        </label>
        <div className="flex items-center gap-3">
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="input-field w-auto min-w-[100px]"
            disabled={isSubmitting}
          >
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-all duration-200 hover:scale-110 ${
                  star <= rating ? "text-amber-400" : "text-muted"
                }`}
                disabled={isSubmitting}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Feedback
            </>
          )}
        </button>
      </div>
    </form>
  );
}
