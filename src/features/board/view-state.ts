import { useState } from "react";

type AddStickerViewState = {
  type: "add-sticker";
};

type IdleViewState = {
  type: "idle";
};

type ViewState = AddStickerViewState | IdleViewState;

export function useBoardViewState() {
  const [ViewState, setViewState] = useState<ViewState>({
    type: "idle",
  });

  const goToIdle = () => {
    setViewState({
      type: "idle",
    });
  };

  const goToAddSticker = () => {
    setViewState({
      type: "add-sticker",
    });
  };
  return {
    ViewState,
    goToIdle,
    goToAddSticker,
  };
}
