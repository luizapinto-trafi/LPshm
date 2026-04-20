import type { KeyboardEvent } from "react";

export const handleKeyDown = (
  event: KeyboardEvent,
  callback: () => void,
  keys: string[]
): void => {
  if (keys.includes(event.key)) {
    callback();
  }
};
