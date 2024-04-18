import { Link } from "react-router-dom";
import { ImageBase64 } from "../ImageBase64";
import styles from "./Card.module.css";

interface ICard {
  href: string;
  thumb: string;
  text: string;
}

export function Card({ href, thumb, text }: ICard) {
  return (
    <Link to={href} className={styles.card}>
      <ImageBase64 src={thumb} />
      <span>{text}</span>
    </Link>
  );
}
