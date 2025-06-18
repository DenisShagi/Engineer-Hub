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
import { Layout } from "./ui/layout";
import { Dots } from "./ui/dots";
import { Canvas } from "./ui/canvas";
import { Overlay } from "./ui/overlay";
import { Sticker } from "./ui/sticker";
import { SelectionWindow } from "./ui/selectionWindow";
import { Actions } from "./ui/actions";
import { ActionButton } from "./ui/actionButton";
import { useNodesDimensions } from "./hooks/use-nodes-dimensions";

function BoardPage() {
  // const params = useParams<PathParams[typeof ROUTES.BOARD]>();

  const { canvasRef, canvasRect } = useCanvasRef();
  const { nodeRef, nodesDimensions } = useNodesDimensions();
  const nodesModel = useNodes();
  const focusRef = useLayoutFocus();

  const viewModel = useViewModel({
    canvasRect,
    nodesModel,
    nodesDimensions,
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
            ref={nodeRef}
            cursorType={viewModel.viewState.type}
            {...node}
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
