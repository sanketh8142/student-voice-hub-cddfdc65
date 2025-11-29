import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp,
  Firestore,
  Timestamp,
  query,
  orderBy
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy6rjQ91NJNHhwCvsBAe53DM8LQZRu8sQ",
  authDomain: "student-feedback-app-7bae0.firebaseapp.com",
  projectId: "student-feedback-app-7bae0",
  storageBucket: "student-feedback-app-7bae0.firebasestorage.app",
  messagingSenderId: "729376853376",
  appId: "1:729376853376:web:80de7d8556f29adba5c565",
  measurementId: "G-QD961L1LF7"
};

// Initialize Firebase only once
let app: FirebaseApp;
let db: Firestore;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { db };

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

export async function createFeedback(data: FeedbackData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "feedbacks"), {
      ...data,
      created_at: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating feedback:", error);
    throw error;
  }
}

export async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const feedbacksRef = collection(db, "feedbacks");
    const q = query(feedbacksRef, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    
    const results: Feedback[] = [];
    snapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data()
      } as Feedback);
    });
    
    return results;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    // Return empty array if there's an error (e.g., no index yet)
    return [];
  }
}

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
