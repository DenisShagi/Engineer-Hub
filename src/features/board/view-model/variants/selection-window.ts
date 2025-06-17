import { Point } from "../../domain/point";
import { createRectFromPoint } from "../../domain/rect";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { ViewModelParams } from "../view-model-params";
import { ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type SelectionWindowViewState = {
  type: "selection-window";
  startPoint: Point;
  endPoint: Point;
};

export function useSelectionWindowViewModel({
  canvasRect,
  nodesModel,
  setViewState,
}: ViewModelParams) {
  return (state: SelectionWindowViewState): ViewModel => {
    const rect = createRectFromPoint(state.startPoint, state.endPoint);
    return {
      selectionWindow: rect,
      nodes: nodesModel.nodes,

      window: {
        onMouseMove(e) {
          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            canvasRect,
          );
          setViewState({
            ...state,
            endPoint: currentPoint,
          });
        },
        onMouseUp: () => {
          setViewState(goToIdle());
        },
      },
    };
  };
}

export function goToSelectionWindow(
  startPoint: { x: number; y: number },
  endPoint: { x: number; y: number },
): SelectionWindowViewState {
  return {
    type: "selection-window",
    startPoint,
    endPoint,
  };
}
