"use client";

import { ErrorFallbackPropsType } from "@/types";

import styles from "./styles.module.css";

const ErrorFallback = ({ error, reset }: ErrorFallbackPropsType) => {
  return (
    <div className={styles.ErrorFallback}>
      <p>Oops, something went wrong!</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
