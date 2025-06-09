import { useState } from "react";
import { ApiSchemas } from "@/shared/api/schema";
import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { BoardsListCard } from "../ui/boards-list-card";
import { Button } from "@/shared/ui/kit/button";
import { useUpdateFavorite } from "../model/use-update-favorite";
import { useDeleteBoard } from "../model/use-delete-board";
import { UIModal } from "@/shared/ui/modal/ui-modal";

export function BoardCard({ board }: { board: ApiSchemas["Board"] }) {
  const [isShow, setIsShow] = useState(false);

  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  return (
    <>
      <BoardsListCard
        key={board.id}
        board={board}
        rightTopActions={
          <BoardsFavoriteToggle
            isFavorite={updateFavorite.isOptimisticFavorite(board)}
            onToggle={() => updateFavorite.toggle(board)}
          />
        }
        bottomActions={
          <Button
            variant="destructive"
            disabled={deleteBoard.getIsPending(board.id)}
            onClick={() => setIsShow(true)}
          >
            Удалить
          </Button>
        }
      />

      <UIModal isOpen={isShow} onClose={() => setIsShow(false)} width="md">
        <UIModal.Header>Удалить доску?</UIModal.Header>
        <UIModal.Body>Это действие нельзя будет отменить</UIModal.Body>
        <UIModal.Footer>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto cursor-pointer transition-colors duration-200 hover:bg-gray-100"
            onClick={() => setIsShow(false)}
          >
            Вернуться
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="w-full sm:w-auto cursor-pointer transition-colors duration-200 hover:bg-red-600"
            onClick={() => {
              deleteBoard.deleteBoard(board.id);
              setIsShow(false);
            }}
          >
            Подтвердить
          </Button>
        </UIModal.Footer>
      </UIModal>
    </>
  );
}
