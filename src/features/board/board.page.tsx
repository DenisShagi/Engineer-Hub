// import { PathParams, ROUTES } from "@/shared/model/routes";
// import { useParams } from "react-router-dom";
import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import { useViewState } from "./model/view-state";
import { useNodes } from "./model/nodes";
import { useCanvasRef } from "./hooks/use-canvas-rect";
import React, { Ref } from "react";
import clsx from "clsx";
import { useLayoutFocus } from "./hooks/use-layout-focus";
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/kit/tooltip'
import { getCursorClass } from "@/shared/lib/cursor-manager";
import { useViewModel } from "./view-model/use-view-model";
import { Rect } from "./domain/rect";

function BoardPage() {
  // const params = useParams<PathParams[typeof ROUTES.BOARD]>();

  const { canvasRef, canvasRect } = useCanvasRef();
  const nodesModel = useNodes();
  const viewStateModel = useViewState();
  const focusRef = useLayoutFocus();

  const viewModel = useViewModel({
    canvasRect,
    nodesModel,
    viewStateModel,
  });

  return (
    <Layout onKeyDown={viewModel.layout?.onKeyDown} ref={focusRef}>
      <Dots />

      <Canvas
        ref={canvasRef}
        onClick={viewModel.canvas?.onClick}
        className={clsx(getCursorClass(viewStateModel.viewState.type))}
      >
        <Overlay
          onClick={viewModel.overlay?.onClick}
          onMouseDown={viewModel.overlay?.onMouseDown}
          onMouseUp={viewModel.overlay?.onMouseUp}
        />
        {viewModel.nodes.map((node) => (
          <Sticker
            key={node.id}
            text={node.text}
            x={node.x}
            y={node.y}
            selected={node.isSelected}
            onClick={node.onClick}
            cursorType={viewStateModel.viewState.type}
          />
        ))}
      </Canvas>
      {viewModel.selectionWindow && (
        <SelectionWindow {...viewModel.selectionWindow} />
      )}
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

function SelectionWindow({ height, width, x, y }: Rect) {
  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `translate${x}px, ${y}px`,
        width: width,
        height: height,
      }}
    ></div>
  );
}

function Overlay({
  onClick,
  onMouseDown,
  onMouseUp,
}: {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className="absolute inset-0"
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    ></div>
  );
}

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
  cursorType,
}: {
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  cursorType?: string;
}) {
  return (
    <button
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
