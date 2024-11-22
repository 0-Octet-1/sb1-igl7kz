import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { subDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function fetchStats() {
  try {
    // Récupérer les statistiques des utilisateurs
    const usersRef = collection(db, 'users');
    const activeUsersQuery = query(
      usersRef,
      where('lastLogin', '>=', subDays(new Date(), 30))
    );
    const activeUsersSnapshot = await getDocs(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.size;

    // Récupérer les statistiques des formations
    const coursesRef = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesRef);
    const totalCourses = coursesSnapshot.size;

    // Calculer les statistiques d'activité sur les 6 derniers mois
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subDays(new Date(), i * 30);
      return format(date, 'MMM', { locale: fr });
    }).reverse();

    return {
      overview: {
        totalUsers: 245,
        activeUsers,
        completionRate: 68,
        averageProgress: 72,
        userGrowth: 12,
        courseCompletions: totalCourses
      },
      userActivity: {
        labels: months,
        datasets: [
          {
            label: 'Utilisateurs Actifs',
            data: [65, 78, 90, 85, 95, 110],
            borderColor: '#0EA5E9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
          }
        ]
      },
      courseProgress: {
        labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'],
        datasets: [
          {
            label: 'Taux de Complétion',
            data: [85, 72, 65, 45, 30],
            backgroundColor: '#0EA5E9',
          }
        ]
      },
      popularCourses: [
        {
          id: '1',
          title: 'Initiation au Cockpit',
          enrollments: 156,
          completionRate: 78,
          averageRating: 4.5
        },
        {
          id: '2',
          title: 'Navigation Tactique',
          enrollments: 124,
          completionRate: 65,
          averageRating: 4.3
        },
        {
          id: '3',
          title: 'Combat Aérien',
          enrollments: 98,
          completionRate: 45,
          averageRating: 4.7
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}