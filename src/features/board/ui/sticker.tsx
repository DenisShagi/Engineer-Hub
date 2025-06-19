import { getCursorClass } from "@/shared/lib/cursor-manager";
import clsx from "clsx";
import React, { Ref, useLayoutEffect, useRef, useState } from "react";
export function Sticker({
  id,
  ref,
  text,
  x,
  y,
  isSelected,
  isEditing,
  cursorType,
  onClick,
  onTextChange,
  onMouseDown,
  onMouseUp,
}: {
  id: string;
  ref: Ref<HTMLButtonElement>;
  text: string;
  x: number;
  y: number;
  isSelected?: boolean;
  isEditing?: boolean;
  cursorType?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTextChange?: (text: string) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      data-id={id}
      ref={ref}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md text-left",
        isSelected && " outline-2 outline-blue-500",
        cursorType && getCursorClass(cursorType),
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <TextareaAutoSize
        value={text}
        isEditing={isEditing ?? false}
        onChange={(value) => onTextChange?.(value)}
      />
    </button>
  );
}

function TextareaAutoSize({
  value,
  isEditing,
  onChange,
}: {
  value: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const { scrollWidth, clientHeight } = ref.current;
    setHeight(clientHeight);
    setWidth(scrollWidth);
  }, [value]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={clsx("whitespace-pre-wrap", isEditing && "opacity-100")}
      >
        {value}
      </div>
      {isEditing && (
        <textarea
          className="absolute left-0 top-0 resize-none overflow-hidden focus:outline-none"
          value={value}
          autoFocus
          onChange={(e) => onChange?.(e.target.value)}
          style={{ width: width + 2, height: height + 2 }}
        />
      )}
    </div>
  );
}
