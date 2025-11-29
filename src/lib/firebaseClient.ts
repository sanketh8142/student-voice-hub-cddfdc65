// Import Firebase core & Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";

// Firebase configuration (from Student B)
const firebaseConfig = {
  apiKey: "AIzaSyCy6rjQ91NJNHhwCvsBAe53DM8LQZRu8sQ",
  authDomain: "student-feedback-app-7bae0.firebaseapp.com",
  projectId: "student-feedback-app-7bae0",
  storageBucket: "student-feedback-app-7bae0.firebasestorage.app",
  messagingSenderId: "729376853376",
  appId: "1:729376853376:web:80de7d8556f29adba5c565",
  measurementId: "G-QD961L1LF7"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firestore database reference
export const db = getFirestore(app);

// Types
export interface FeedbackData {
  name: string;
  email: string;
  message: string;
  rating: number;
}

export interface Feedback extends FeedbackData {
  id: string;
  created_at: Timestamp | null;
}

// Create a feedback document in Firestore
export async function createFeedback({ name, email, message, rating }: FeedbackData) {
  await addDoc(collection(db, "feedbacks"), {
    name,
    email,
    message,
    rating,
    created_at: serverTimestamp()
  });
}

// Get all feedback documents
export async function getFeedbacks(): Promise<Feedback[]> {
  const snapshot = await getDocs(collection(db, "feedbacks"));
  const results: Feedback[] = [];
  snapshot.forEach(doc => {
    results.push({ id: doc.id, ...doc.data() } as Feedback);
  });
  return results;
}

// Format timestamp for display
export function formatTimestamp(timestamp: Timestamp | null | undefined): string {
  if (!timestamp) return "";
  try {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  } catch {
    return "";
  }
}
