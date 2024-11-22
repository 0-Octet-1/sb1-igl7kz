import { LearningModule, Procedure, SystemInfo } from '../types';

export const cockpitModules: LearningModule[] = [
  {
    id: 'basic-layout',
    title: 'Disposition Générale',
    description: 'Vue d\'ensemble du cockpit et des principaux panneaux',
    duration: '30 minutes',
    difficulty: 'Débutant'
  },
  {
    id: 'front-panel',
    title: 'Panneau Principal',
    description: 'Instruments de vol et systèmes principaux',
    duration: '45 minutes',
    difficulty: 'Débutant'
  },
  {
    id: 'side-panels',
    title: 'Panneaux Latéraux',
    description: 'Systèmes secondaires et commandes auxiliaires',
    duration: '45 minutes',
    difficulty: 'Intermédiaire'
  }
];

export const procedures: Procedure[] = [
  {
    id: 'cold-start',
    title: 'Démarrage à Froid',
    steps: [
      'Vérification externe',
      'Alimentation électrique',
      'Démarrage du moteur',
      'Vérifications post-démarrage'
    ],
    warnings: [
      'Ne jamais dépasser 25% N2 pendant le démarrage',
      'Surveiller la température EGT'
    ]
  },
  {
    id: 'takeoff',
    title: 'Procédure de Décollage',
    steps: [
      'Vérifications avant décollage',
      'Alignement',
      'Mise en puissance',
      'Rotation'
    ]
  }
];

export const systems: SystemInfo[] = [
  {
    id: 'radar',
    name: 'Radar RDI',
    description: 'Radar Doppler à Impulsion',
    components: [
      {
        name: 'Antenne',
        description: 'Antenne radar multi-modes',
        location: 'Nez de l\'appareil'
      },
      {
        name: 'Écran radar',
        description: 'Affichage des contacts et informations',
        location: 'Panneau principal'
      }
    ]
  },
  {
    id: 'fcs',
    name: 'Commandes de Vol',
    description: 'Système de contrôle fly-by-wire',
    components: [
      {
        name: 'Calculateur',
        description: 'Ordinateur de contrôle des surfaces',
        location: 'Baie avionique'
      }
    ]
  }
];