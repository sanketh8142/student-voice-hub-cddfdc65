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

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
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
