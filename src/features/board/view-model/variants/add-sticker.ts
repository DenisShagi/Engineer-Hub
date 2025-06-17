import { ViewModelParams } from "../view-model-params";
import { ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type AddStickerViewState = {
  type: "add-sticker";
};

export function useAddStickerViewModel({
  canvasRect,
  nodesModel,
  setViewState,
}: ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setViewState(goToIdle({ selectedIds: new Set() }));
        }
      },
    },
    actions: {
      addSticker: {
        isActive: true,
        onClick: () => setViewState(goToIdle({ selectedIds: new Set() })),
      },
    },
    canvas: {
      onClick: (e) => {
        if (!canvasRect) return;
        nodesModel.addSticker({
          text: "Default",
          x: e.clientX - canvasRect.x,
          y: e.clientY - canvasRect.y,
        });
        setViewState(goToIdle({ selectedIds: new Set() }));
      },
    },
    overlay: {
      onClick: () => setViewState(goToIdle({ selectedIds: new Set() })),
    },
  });
}

export function goToAddSticker():AddStickerViewState {
  return {
    type: 'add-sticker',
    

  }
}