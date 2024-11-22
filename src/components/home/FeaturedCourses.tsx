import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const courses = [
  {
    id: 1,
    title: 'Initiation au Cockpit',
    description: 'Familiarisez-vous avec les instruments et systèmes de base',
    duration: '2 heures',
    level: 'Débutant',
  },
  {
    id: 2,
    title: 'Navigation Tactique',
    description: 'Maîtrisez les systèmes de navigation et de communication',
    duration: '3 heures',
    level: 'Intermédiaire',
  },
  {
    id: 3,
    title: 'Combat Aérien',
    description: 'Techniques avancées de combat air-air',
    duration: '4 heures',
    level: 'Avancé',
  },
];

export default function FeaturedCourses() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-interactive/20">
      <div className="max-w-content mx-auto px-4">
        <h2 className="text-center mb-12">Formations Populaires</h2>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-3">{course.title}</h3>
              <p className="text-primary/80 mb-4">{course.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-accent">{course.duration}</span>
                <span className="bg-background/20 px-3 py-1 rounded">
                  {course.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}