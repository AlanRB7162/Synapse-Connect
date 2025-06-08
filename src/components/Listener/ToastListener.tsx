// src/components/ToastListener.tsx
import { useLocationToast } from "../../hooks/useLocationToast";

export function ToastListener() {
  useLocationToast();
  return null; // componente apenas executa o hook
}