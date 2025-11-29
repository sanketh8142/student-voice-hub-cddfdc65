import React from "react";
import { Feedback, formatTimestamp } from "@/lib/firebaseClient";
import { CheckCircle2, User, Clock, Loader2 } from "lucide-react";

interface FeedbackListProps {
  feedbacks: Feedback[];
  loading: boolean;
}

function getRatingBadgeClass(rating: number): string {
  if (rating >= 4) return "rating-badge rating-high";
  if (rating >= 3) return "rating-badge rating-medium";
  return "rating-badge rating-low";
}

function getRatingLabel(rating: number): string {
  const labels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };
  return labels[rating] || "";
}

export default function FeedbackList({ feedbacks, loading }: FeedbackListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p>Loading feedback...</p>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No feedback yet</h3>
        <p className="text-muted-foreground">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {feedbacks.map((feedback, index) => (
        <li
          key={feedback.id}
          className="p-5 bg-secondary/50 border border-border rounded-xl animate-fade-in hover:bg-secondary/80 transition-colors"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground truncate">
                  {feedback.name}
                </h4>
                {feedback.rating >= 4 && (
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{feedback.email}</p>
            </div>
            <div className={getRatingBadgeClass(feedback.rating)}>
              <span className="text-amber-500">★</span>
              <span>{feedback.rating}/5</span>
              <span className="hidden sm:inline text-xs opacity-75">
                {getRatingLabel(feedback.rating)}
              </span>
            </div>
          </div>

          {feedback.message && (
            <p className="mt-3 text-foreground/90 leading-relaxed">{feedback.message}</p>
          )}

          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <time>{formatTimestamp(feedback.created_at)}</time>
          </div>
        </li>
      ))}
    </ul>
  );
}
