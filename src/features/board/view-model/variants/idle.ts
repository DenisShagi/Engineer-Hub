import { selectItems } from "../../domain/selection";
import { ViewModelParams } from "../view-model-params";
import { ViewModel } from "../view-model-type";

export type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
  mouseDown?: {
    x: number;
    y: number;
  };
};

export function useIdleViewModel({
  nodesModel,
  setViewState,
}: ViewModelParams) {
  return (idleState: IdleViewState): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      isSelected: idleState.selectedIds.has(node.id),
      onClick: (e) => {
        if (e.ctrlKey || e.shiftKey) {
          setViewState({
            ...idleState,
            selectedIds: selectItems(
              idleState.selectedIds,
              [node.id],
              "toggle",
            ),
          });
        } else {
          setViewState({
            ...idleState,
            selectedIds: selectItems(
              idleState.selectedIds,
              [node.id],
              "replace",
            ),
          });
        }
      },
    })),
    layout: {
      onKeyDown: (e) => {
        if (e.key === "s" || e.key === "ы") {
          viewStateModel.goToAddSticker();
        }
      },
    },

    overlay: {
      onClick: () => {
        viewStateModel.selection([], "replace");
      },
      onMouseDown(e) {
        console.log("onMouseDown", e);
      },
    },
    window: {
      onMouseMove(e) {
        console.log("onMouseMove", e);
      },
      onMouseUp(e) {
        console.log("onMouseUp", e);
      },
    },
    actions: {
      addSticker: {
        isActive: false,
        onClick: () => setViewState(goToAddSticker()),
      },
    },
  });
}

export function goToIdle(): IdleViewState {
  return {
    type: "idle",
    selectedIds: new Set(),
  };
}
