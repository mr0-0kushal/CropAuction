import { motion } from "framer-motion";
import CreateEarnHome from "../components/home/CreateEarnHome";
import HeroHome from "../components/home/HeroHome";
import LiveHome from "../components/home/LiveHome";
import ProcessHome from "../components/home/ProcessHome";
import { register } from "swiper/element/bundle";

// Register Swiper custom elements
register();

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ staggerChildren: 0.2 }}
      >
        <HeroHome />
      </motion.div>

      <motion.div
        className="px-5 lg:px-12 flex flex-col gap-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
      >
        <motion.div variants={fadeInUp}>
          <LiveHome />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <ProcessHome />
        </motion.div>
        <motion.div variants={fadeInUp} className="text-white flex flex-col gap-8">
          <CreateEarnHome />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
