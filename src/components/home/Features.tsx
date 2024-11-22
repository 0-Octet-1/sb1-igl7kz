import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: AcademicCapIcon,
    title: 'Formation Progressive',
    description: 'Apprenez à votre rythme avec des modules structurés',
  },
  {
    icon: UserGroupIcon,
    title: 'Communauté Active',
    description: 'Échangez avec d\'autres pilotes passionnés',
  },
  {
    icon: ChartBarIcon,
    title: 'Suivi de Progression',
    description: 'Visualisez votre évolution et vos accomplissements',
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20">
      <div className="max-w-content mx-auto px-4">
        <h2 className="text-center mb-12">Pourquoi nous choisir ?</h2>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-primary/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}