import { useRef, useState } from "react";
import styles from "./styles.module.css";

const Checkbox = ({
  id,
  defaultChecked,
  onChange,
}: {
  id: string;
  defaultChecked: boolean;
  onChange: (value: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(defaultChecked || false);
  const handleChange = () => {
    if (inputRef.current === null) return;
    setChecked(inputRef.current.checked);
    onChange(inputRef.current.value);
  };
  return (
    <input
      className={styles.checkbox}
      id={id}
      ref={inputRef}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
};
export default Checkbox;
