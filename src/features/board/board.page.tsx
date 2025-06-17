// import { PathParams, ROUTES } from "@/shared/model/routes";
// import { useParams } from "react-router-dom";
import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { useNodes } from "./model/nodes";
import { useCanvasRef } from "./hooks/use-canvas-rect";
import clsx from "clsx";
import { useLayoutFocus } from "./hooks/use-layout-focus";
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/kit/tooltip'
import { getCursorClass } from "@/shared/lib/cursor-manager";
import { useViewModel } from "./view-model/use-view-model";
import { useWindowEvents } from "./hooks/use-window-events";
import { Layout } from "./ui/Layout";
import { Dots } from "./ui/Dots";
import { Canvas } from "./ui/Canvas";
import { Overlay } from "./ui/Overlay";
import { Sticker } from "./ui/Sticker";
import { SelectionWindow } from "./ui/SelectionWindow";
import { Actions } from "./ui/Actions";
import { ActionButton } from "./ui/ActionButton";

function BoardPage() {
  // const params = useParams<PathParams[typeof ROUTES.BOARD]>();

  const { canvasRef, canvasRect } = useCanvasRef();
  const nodesModel = useNodes();
  const focusRef = useLayoutFocus();

  const viewModel = useViewModel({
    canvasRect,
    nodesModel,
  });

  useWindowEvents(viewModel);

  return (
    <Layout onKeyDown={viewModel.layout?.onKeyDown} ref={focusRef}>
      <Dots />

      <Canvas
        ref={canvasRef}
        onClick={viewModel.canvas?.onClick}
        className={clsx(getCursorClass(viewModel.viewState.type))}
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
            cursorType={viewModel.viewState.type}
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
