import styles from "./style.module.css";
import { useState } from "react";
import defaultImg from "../../assets/3.png";
import hover1 from "../../assets/4.png";
import hover2 from "../../assets/5.png";
import hover3 from "../../assets/6.png";

type Props = {
	classe: string;
	text: string;
  action:()=>void
};

export const CardButton = ({ classe, text, action }: Props) => {
  const [src, setSrc] = useState(defaultImg);

  const hoverMap: Record<string, string> = {
    btn_1: hover1,
    btn_2: hover2,
    btn_3: hover3,
  };

  const handleMouseEnter = () => {
    const hoverImg = hoverMap[classe];
    if (hoverImg) setSrc(hoverImg);
  };

  const handleMouseLeave = () => {
    setSrc(defaultImg);
  };

  return (
    <button
      className={`${styles.btn}`}
      onClick={() => action()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} className={styles.btnImage} alt="" />
      <span className={styles.btnText}>{text}</span>
    </button>
  );
};