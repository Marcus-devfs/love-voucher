"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const { setRole } = useStore();
  const router = useRouter();

  const handleEnter = (role: 'husband' | 'wife') => {
    setRole(role);
    router.push(`/dashboard/${role}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-200/30 rounded-full mix-blend-multiply filter blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl w-full"
      >
        <div className="text-center mb-20">
          <motion.div variants={itemVariants}>
            <h1 className="text-7xl md:text-9xl font-serif font-bold italic text-rose-600 mb-6 tracking-tighter leading-none">
              Love <span className="italic text-rose-600">Vouchers</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Uma coleção exclusiva de momentos e gestos de carinho.<br />
              <span className="font-serif italic text-gray-400">Escolha seu perfil para começar.</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto"
        >
          <RoleCard
            title="Para Ela"
            subtitle="DESTINATÁRIA"
            description="Seus presentes, suas escolhas. Descubra os mimos preparados para você."
            emoji="🌹"
            onClick={() => handleEnter('wife')}
            colorClass="group-hover:ring-rose-200 group-hover:shadow-rose-100"
            bgGradient="from-rose-50/50"
          />
          <RoleCard
            title="Para Ele"
            subtitle="CRIADOR"
            description="Prepare as surpresas e gerencie os momentos especiais do casal."
            emoji="🎩"
            onClick={() => handleEnter('husband')}
            colorClass="group-hover:ring-indigo-200 group-hover:shadow-indigo-100"
            bgGradient="from-indigo-50/50"
          />
        </motion.div>

        <motion.footer variants={itemVariants} className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-sm font-semibold text-rose-900 border border-white/40 shadow-sm">
            <span>Feito com todo ❤️ amor do mundo</span>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
}

interface RoleCardProps {
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  onClick: () => void;
  colorClass: string;
  bgGradient: string;
}

function RoleCard({ title, subtitle, description, emoji, onClick, colorClass, bgGradient }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group p-8 md:p-10 rounded-[2.5rem] text-left transition-all duration-500",
        "bg-white/80 glass-card hover:-translate-y-2 hover:shadow-2xl",
        "ring-1 ring-white/60 hover:ring-2",
        colorClass
      )}
    >
      {/* Inner Hover Gradient */}
      <div className={cn(
        "absolute inset-0 rounded-[2.5rem] bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        bgGradient
      )} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="text-6xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 origin-top-left">{emoji}</div>
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border transition-colors",
            "border-gray-200 bg-white group-hover:border-gray-300"
          )}>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <div className="mt-auto">
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{subtitle}</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3 leading-tight">{title}</h2>
          <p className="text-gray-600 font-light text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
}
