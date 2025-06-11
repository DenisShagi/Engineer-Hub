import clsx from "clsx";
import { createPortal } from "react-dom";
import { ReactNode, useEffect } from "react";

type Props = {
  width?: "md" | "full";
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: ReactNode;
};

export function UIModal({
  width = "md",
  className,
  children,
  isOpen,
  onClose,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const inModal = (e.target as HTMLElement).closest("[data-id=modal]");
    if (inModal) return;
    onClose();
  };
useEffect(() => {
  if (isOpen) {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }
}, [isOpen]);
  if (!isOpen) return null;



  const modal = (
    <div
      onClick={handleClick}
      className={clsx(
        "fixed inset-0 bg-slate-900/60 backdrop-blur flex items-center justify-center z-50",
        className,
      )}
    >
      <div
        data-id="modal"
        className={clsx(
          "bg-white rounded-lg min-h-[220px] w-full mx-auto  relative flex flex-col",
          {
            md: "max-w-[640px] w-full",
            full: "mx-5 max-w-full",
          }[width],
        )}
      >
        <button
          onClick={onClose}
          className="w-8 h-8 flex rounded items-center hover:bg-white/40 transition-colors cursor-pointer justify-center bg-white/10 absolute top-0 left-[calc(100%+12px)]"
        >
          <CrossLightIcon className="w-4 h-4 text-white " />
        </button>
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById("modals")!);
}

UIModal.Header = function UIModalHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "text-2xl font-semibold text-center px-6 pt-6 pb-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

UIModal.Body = function UIModalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx("text-center text-xl text-gray-600 px-6 pb-4 pt-4", className)}
    >
      {children}
    </div>
  );
};

UIModal.Footer = function UIModalFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mt-auto px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-4 justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
};


function CrossLightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5L5 19M5 5L19 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
