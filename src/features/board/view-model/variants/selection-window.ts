import { Point } from "../../domain/point";
import {
  createRectFromPoint,
  isRectsIntersecting,
  Rect,
} from "../../domain/rect";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { selectItems } from "../../domain/selection";
import { ViewModelParams } from "../view-model-params";
import { ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type SelectionWindowViewState = {
  type: "selection-window";
  startPoint: Point;
  endPoint: Point;
  initialSelectedIds: Set<string>;
};

export function useSelectionWindowViewModel({
  canvasRect,
  nodesModel,
  setViewState,
  nodesRects,
}: ViewModelParams) {
  const getNodes = (state: SelectionWindowViewState, selectionRect: Rect) =>
    nodesModel.nodes.map((node) => {
      const nodeDimensions = nodesRects[node.id];

      const nodeRect = {
        x: node.x,
        y: node.y,
        width: nodeDimensions.width,
        height: nodeDimensions.height,
      };
      return {
        ...node,
        isSelected:
          isRectsIntersecting(nodeRect, selectionRect) ||
          state.initialSelectedIds.has(node.id),
      };
    });
  return (state: SelectionWindowViewState): ViewModel => {
    const rect = createRectFromPoint(state.startPoint, state.endPoint);
    const nodes = getNodes(state, rect)
    return {
      selectionWindow: rect,
      nodes,
      

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
          const nodesIdsInRect = nodes.filter((node) => node.isSelected).map((node) => node.id);
          setViewState(
            goToIdle({
              selectedIds: selectItems(
                state.initialSelectedIds,
                nodesIdsInRect,
                "add",
              ),
            }),
          );
        },
      },
    };
  };
}

export function goToSelectionWindow({
  startPoint,
  endPoint,
  initialSelectedIds,
}: {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  initialSelectedIds?: Set<string>;
}): SelectionWindowViewState {
  return {
    type: "selection-window",
    startPoint,
    endPoint,
    initialSelectedIds: initialSelectedIds ?? new Set(),
  };
}
