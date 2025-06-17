import { getCursorClass } from "@/shared/lib/cursor-manager";
import clsx from "clsx";
import React, {Ref} from 'react';
export function Sticker({
  id,
  ref,
  text,
  x,
  y,
  onClick,
  selected,
  cursorType,
}: {
  id: string
  ref: Ref<HTMLButtonElement>;
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  cursorType?: string;
}) {
  return (
    <button
    data-id={id}
    ref={ref}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        selected && " outline-2 outline-blue-500",
        cursorType && getCursorClass(cursorType),
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
