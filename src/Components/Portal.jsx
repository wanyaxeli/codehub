
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children, selector = "#portal-root" }) {
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    setMounted(true);
    const el = document.querySelector(selector);
    setElement(el);
  }, [selector]);

  if (!mounted || !element) return null;

  return createPortal(children, element);
}
