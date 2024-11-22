import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Vidéo en arrière-plan */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover w-auto h-auto"
        >
          <source src="/videos/m2000c-background.mp4" type="video/mp4" />
          {/* Fallback pour les navigateurs qui ne supportent pas la vidéo */}
          <img 
            src="https://i.imgur.com/QqUPGZg.jpg" 
            alt="M2000C en vol" 
            className="absolute min-w-full min-h-full object-cover"
          />
        </video>
      </div>

      {/* Overlay sombre avec effet de grain */}
      <div 
        className="absolute inset-0 bg-black/60"
        style={{
          backgroundImage: 'url("/images/noise.png")',
          opacity: 0.7
        }}
      />
      
      <div className="relative z-10 max-w-content mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <img src="/logo-aiglons.png" alt="Logo" className="h-24 w-24 mx-auto mb-4" />
          <h2 className="text-2xl text-accent">Les Aiglons de Coureau</h2>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          L'Excellence du <span className="text-accent">Mirage 2000C</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          Formation d'élite pour pilotes passionnés
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-x-4"
        >
          <button className="btn bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg transition-all">
            Rejoindre l'escadron
          </button>
          <button className="btn bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-all">
            Découvrir nos formations
          </button>
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Découvrir</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}