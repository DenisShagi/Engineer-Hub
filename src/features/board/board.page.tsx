// import { PathParams, ROUTES } from "@/shared/model/routes";
// import { useParams } from "react-router-dom";
import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import { useBoardViewState } from "./view-state";
import { useNodes } from "./nodes";
import { useCanvasRef } from "./use-canvas-rect";
import { Ref } from "react";

function BoardPage() {
  // const params = useParams<PathParams[typeof ROUTES.BOARD]>();

  const { nodes, addSticker } = useNodes();
  const { ViewState, goToAddSticker, goToIdle } = useBoardViewState();
  const { canvasRef, canvasRect } = useCanvasRef();

  return (
    <Layout
      onKeyDown={(e) => {
        if (ViewState.type === "add-sticker") {
          if (e.key === "Escape") {
            goToIdle();
          }
        }
        if (ViewState.type === "idle") {
          if (e.key === "s") {
            goToAddSticker();
          }
        }
      }}
    >
      <Dots />
      <Canvas
        ref={canvasRef}
        onClick={(e) => {
          if (ViewState.type === "add-sticker" && canvasRect) {
            addSticker({
              text: "Default",
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect.y,
            });
            goToIdle();
          }
        }}
      >
        {nodes.map((node) => (
          <Sticker key={node.id} text={node.text} x={node.x} y={node.y} />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={ViewState.type === "add-sticker"}
          onClick={() => {
            if (ViewState.type === "add-sticker") {
              goToIdle();
            } else {
              goToAddSticker();
            }
          }}
        >
          <StickerIcon />
        </ActionButton>
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
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="grow relative" tabIndex={0} {...props}>
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
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div ref={ref} {...props} className="absolute inset-0">
      {children}
    </div>
  );
}

function Sticker({ text, x, y }: { text: string; x: number; y: number }) {
  return (
    <div
      className="absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {text}
    </div>
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
  isActive: boolean;
  onClick: () => void;
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
