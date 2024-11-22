import React from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Mes Réalisations</h2>
      
      <div className="space-y-4">
        {achievements?.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 border rounded-lg ${
              achievement.unlockedAt ? 'bg-green-50' : 'bg-gray-50 opacity-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={achievement.icon}
                alt=""
                className="w-8 h-8"
              />
              <div>
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-gray-500">
                  {achievement.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}