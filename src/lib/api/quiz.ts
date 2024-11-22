import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  moduleId: string;
  score: number;
  answers: Record<string, string>;
  completedAt: Date;
  passed: boolean;
}

export async function submitQuizAnswers(
  userId: string,
  courseId: string,
  moduleId: string,
  answers: Record<string, string>
): Promise<QuizResult> {
  try {
    // Récupérer les questions et réponses correctes
    const quizRef = doc(db, 'quizzes', moduleId);
    const quizDoc = await getDoc(quizRef);
    const quizData = quizDoc.data();

    if (!quizData) {
      throw new Error('Quiz non trouvé');
    }

    // Calculer le score
    let correctAnswers = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      if (quizData.questions[questionId].correctAnswer === answer) {
        correctAnswers++;
      }
    });

    const totalQuestions = Object.keys(quizData.questions).length;
    const score = (correctAnswers / totalQuestions) * 100;
    const passed = score >= quizData.passingScore;

    // Sauvegarder le résultat
    const resultId = `${userId}_${moduleId}`;
    const result: QuizResult = {
      id: resultId,
      userId,
      moduleId,
      score,
      answers,
      completedAt: new Date(),
      passed
    };

    await setDoc(doc(db, 'quizResults', resultId), result);

    // Mettre à jour la progression si réussi
    if (passed) {
      await updateModuleProgress(userId, moduleId);
    }

    return result;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
}

export async function getQuizResults(userId: string, moduleId: string): Promise<QuizResult | null> {
  try {
    const resultDoc = await getDoc(doc(db, 'quizResults', `${userId}_${moduleId}`));
    return resultDoc.exists() ? resultDoc.data() as QuizResult : null;
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    throw error;
  }
}

async function updateModuleProgress(userId: string, moduleId: string) {
  try {
    const progressRef = doc(db, 'userProgress', `${userId}_${moduleId}`);
    await updateDoc(progressRef, {
      completed: true,
      completedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating module progress:', error);
    throw error;
  }
}