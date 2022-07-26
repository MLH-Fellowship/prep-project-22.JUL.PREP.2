import React from "react";
import styles from "./Fab.module.css";

export function Fab({ children, icon, onClick }) {
  return (
    <button className={styles.fab} onClick={onClick}>
      <span className="material-symbols-outlined">{icon}</span>
      <span className={styles.fabText}>{children}</span>
    </button>
  );
}
