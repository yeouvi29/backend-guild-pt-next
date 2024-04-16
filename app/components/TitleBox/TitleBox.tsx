import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css";

const MotionImage = motion(Image);

const TitleBox = () => {
  return (
    <div className={styles.titleBox}>
      <div className={styles.rainbowBox}>
        <MotionImage
          src={"/rainbow.png"}
          sizes="100vw"
          style={{
            width: "100%",
            height: "fit-content",
          }}
          width={300}
          height={300}
          transition={{ type: "spring", damping: 10, stiffness: 120 }}
          animate={{ scale: 1.05 }}
          className={styles.rainbow}
          alt="Rainbow"
        />
      </div>
      <h1 className={styles.title}>Todo list</h1>
    </div>
  );
};
export default TitleBox;
