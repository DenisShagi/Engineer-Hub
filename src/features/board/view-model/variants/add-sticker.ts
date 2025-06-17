import { AddStickerViewState } from "../../model/view-state";
import { ViewModelParams } from '../view-model-params'
import { ViewModel } from '../view-model-type'


export function useAddStickerViewModel({
  canvasRect,
  nodesModel,
  viewStateModel,
}: ViewModelParams) {
  return (addStickerState: AddStickerViewState): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          viewStateModel.goToIdle();
          console.log(addStickerState);
        }
      },
    },
    actions: {
      addSticker: {
        isActive: true,
        onClick: () => viewStateModel.goToIdle(),
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
        viewStateModel.goToIdle();
      },
    },
  });
}
