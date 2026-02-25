import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Frown } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-black via-slate-900 to-black px-4 py-8 text-center overflow-hidden relative">

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[200px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Bouncing 404 */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mb-4"
      >
        <span className="text-[110px] sm:text-[160px] font-black leading-none tracking-tighter bg-gradient-to-br from-primary via-purple-400 to-secondary bg-clip-text text-transparent select-none drop-shadow-2xl">
          404
        </span>
      </motion.div>

      {/* Trampoline SVG illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", damping: 12 }}
        className="relative z-10 mb-6"
      >
        {/* Simple trampoline made with divs */}
        <div className="relative flex flex-col items-center">
          {/* Sad bouncing figure */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="mb-2"
          >
            <Frown size={48} className="text-primary/80" strokeWidth={1.5} />
          </motion.div>
          {/* Trampoline bed */}
          <div className="relative w-40 sm:w-52 h-4 rounded-full bg-gradient-to-r from-primary/40 via-primary to-secondary/80 shadow-lg shadow-primary/30">
            {/* Spring lines */}
            <div className="absolute -bottom-4 left-4 w-0.5 h-4 bg-muted-foreground/40 rotate-12" />
            <div className="absolute -bottom-4 left-12 w-0.5 h-4 bg-muted-foreground/40 -rotate-6" />
            <div className="absolute -bottom-4 right-12 w-0.5 h-4 bg-muted-foreground/40 rotate-6" />
            <div className="absolute -bottom-4 right-4 w-0.5 h-4 bg-muted-foreground/40 -rotate-12" />
          </div>
          {/* Frame legs */}
          <div className="flex gap-28 sm:gap-40 mt-4">
            <div className="w-1.5 h-6 bg-muted-foreground/50 rounded-full rotate-6" />
            <div className="w-1.5 h-6 bg-muted-foreground/50 rounded-full -rotate-6" />
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 space-y-2 mb-6 max-w-sm"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Oops! You've bounced too far!
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          The page{" "}
          <span className="text-primary font-mono font-semibold">
            {location.pathname}
          </span>{" "}
          doesn't exist. Looks like this trampoline leads nowhere!
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="relative z-10 flex flex-col sm:flex-row gap-3"
      >
        <Button
          size="lg"
          onClick={() => window.history.back()}
          className="bg-white/10 border border-white/30 text-white hover:bg-white/20 px-6"
        >
          <ArrowLeft className="mr-2" size={18} />
          Go Back
        </Button>
        <Button
          size="lg"
          onClick={() => (window.location.href = "/")}
          className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-6"
        >
          <Home className="mr-2" size={18} />
          Back to Home
        </Button>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-8 text-xs text-slate-600"
      >
        Take-off Trampoline Park · Bhopal
      </motion.p>
    </div>
  );
};

export default NotFound;
