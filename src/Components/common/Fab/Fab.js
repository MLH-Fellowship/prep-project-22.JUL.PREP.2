import styles from "./Fab.module.css";

export function Fab({ children, icon, onClick }) {
  return (
    <button className={styles.fab} onClick={onClick}>
      <span class="material-symbols-outlined">{icon}</span>
      <span className={styles.fabText}>{children}</span>
    </button>
  );
}
