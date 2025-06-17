import { CanvasRect } from "../hooks/use-canvas-rect";
import { NodesModel } from "../model/nodes";
import { ViewStateModel } from "../model/view-state";

export type ViewModelParams = {
  viewStateModel: ViewStateModel;
  nodesModel: NodesModel;
  canvasRect: CanvasRect	 | undefined;
};
