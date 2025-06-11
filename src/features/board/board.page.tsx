// import { PathParams, ROUTES } from "@/shared/model/routes";
// import { useParams } from "react-router-dom";
import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import { useViewModel } from "./view-model";
import { useNodes } from "./nodes";
import { useCanvasRef } from "./use-canvas-rect";
import React, { Ref } from "react";
import clsx from "clsx";
import { useLayoutFocus } from "./use-layout-focus";
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/kit/tooltip'
import { getCursorClass } from "@/shared/lib/cursor-manager";

type ViewModelNode = {
  id: string;
  text: string;
  x: number;
  y: number;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type ViewModel = {
  nodes: ViewModelNode[];
  layout?: {
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  };
  canvas?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  actions?: {
    addSticker?: {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      isActive?: boolean;
    };
  };
};

function BoardPage() {
  // const params = useParams<PathParams[typeof ROUTES.BOARD]>();

  const { nodes, addSticker } = useNodes();
  const { canvasRef, canvasRect } = useCanvasRef();
  const viewModelLast = useViewModel();
  const focusRef = useLayoutFocus();

  let viewModel: ViewModel;

  switch (viewModelLast.viewState.type) {
    case "add-sticker":
      viewModel = {
        nodes,
        layout: {
          onKeyDown: (e) => {
            if (e.key === "Escape") {
              viewModelLast.goToIdle();
            }
          },
        },
        actions: {
          addSticker: {
            isActive: true,
            onClick: () => viewModelLast.goToIdle(),
          },
        },
        canvas: {
          onClick: (e) => {
            if (!canvasRect) return;
            addSticker({
              text: "Default",
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect.y,
            });
            viewModelLast.goToIdle();
          },
        },
      };
      break;

    case "idle": {
      const viewState = viewModelLast.viewState;
      viewModel = {
        nodes: nodes.map((node) => ({
          ...node,
          isSelected: viewState.selectedIds.has(node.id),
          onClick: (e) => {
            if (e.ctrlKey || e.shiftKey) {
              viewModelLast.selection([node.id], "toggle");
            } else {
              viewModelLast.selection([node.id], "replace");
            }
          },
        })),
        layout: {
          onKeyDown: (e) => {
            if (e.key === "s" || e.key === "ы") {
              viewModelLast.goToAddSticker();
            }
          },
        },
        actions: {
          addSticker: {
            isActive: false,
            onClick: () => viewModelLast.goToAddSticker(),
          },
        },
      };
      break;
    }

    default:
      throw new Error("Invalid View State");
  }

  return (
    <Layout onKeyDown={viewModel.layout?.onKeyDown} ref={focusRef}>
      <Dots />
      <Canvas
        ref={canvasRef}
        onClick={viewModel.canvas?.onClick}
        className={clsx(getCursorClass(viewModelLast.viewState.type))}
      >
        {viewModel.nodes.map((node) => (
          <Sticker
            key={node.id}
            text={node.text}
            x={node.x}
            y={node.y}
            selected={node.isSelected}
            onClick={node.onClick}
          />
        ))}
      </Canvas>
      <Actions>
        {/* <Tooltip> */}
        {/* <TooltipTrigger> */}
        <ActionButton
          isActive={viewModel.actions?.addSticker?.isActive}
          onClick={viewModel.actions?.addSticker?.onClick}
        >
          <StickerIcon />
        </ActionButton>
        {/* </TooltipTrigger> */}
        {/* <TooltipContent
            side="right"
            sideOffset={2}
            className=" text-sm px-3 py-2 rounded-lg shadow-md flex items-center gap-2 font-medium"
          >
            <span>Sticky note</span>
            <kbd className="text-xs bg-neutral-700 px-1.5 py-0.5 rounded border border-white/20 font-semibold">
              S
            </kbd>
          </TooltipContent>
        </Tooltip> */}

        <ActionButton isActive={false} onClick={() => {}}>
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

export const Component = BoardPage;

function Layout({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="grow relative" tabIndex={0} ref={ref} {...props}>
      {children}
    </div>
  );
}

function Dots() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
  );
}

function Canvas({
  children,
  ref,
  className,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div ref={ref} {...props} className={clsx("absolute inset-0", className)}>
      {children}
    </div>
  );
}

function Sticker({
  text,
  x,
  y,
  onClick,
  selected,
}: {
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
}) {
  return (
    <button
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        selected && " outline-2 outline-blue-500",
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white p-1 rounded-md shadow">
      {children}
    </div>
  );
}

function ActionButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={
        isActive
          ? "bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600"
          : ""
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
