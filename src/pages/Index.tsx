import React, { useState, useEffect } from "react";
import { getFeedbacks, Feedback } from "@/lib/firebaseClient";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import { GraduationCap, MessageSquareText } from "lucide-react";

const Index = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFeedbacks() {
    setLoading(true);
    try {
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to load feedbacks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Student Feedback</h1>
            <p className="text-xs text-muted-foreground">Share your learning experience</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <section className="animate-fade-in">
            <div className="card-elevated p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <MessageSquareText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Share Your Feedback</h2>
                  <p className="text-sm text-muted-foreground">We value your opinion</p>
                </div>
              </div>
              <FeedbackForm onSubmitSuccess={loadFeedbacks} />
            </div>
          </section>

          {/* Feedback List Section */}
          <section className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="card-elevated p-6 lg:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Recent Feedback</h2>
                  <p className="text-sm text-muted-foreground">
                    {feedbacks.length} {feedbacks.length === 1 ? "response" : "responses"}
                  </p>
                </div>
                {feedbacks.length > 0 && (
                  <div className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                    Latest first
                  </div>
                )}
              </div>
              <div className="max-h-[600px] overflow-y-auto pr-1 -mr-1">
                <FeedbackList feedbacks={feedbacks} loading={loading} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Student Feedback System • Built with Lovable</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
