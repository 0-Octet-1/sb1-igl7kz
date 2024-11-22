import React from 'react';
import { motion } from 'framer-motion';

interface AchievementCardProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
  };
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = !!achievement.unlockedAt;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border ${
        isUnlocked 
          ? 'bg-accent/5 border-accent' 
          : 'bg-gray-100 border-gray-200 opacity-50'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${
          isUnlocked ? 'bg-accent/10' : 'bg-gray-200'
        }`}>
          <img
            src={achievement.icon}
            alt=""
            className="w-8 h-8"
          />
        </div>
        
        <div>
          <h3 className="font-medium">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          {isUnlocked && (
            <p className="text-xs text-accent mt-1">
              Débloqué le {achievement.unlockedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}