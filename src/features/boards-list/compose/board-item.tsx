import { useState } from "react";
import { ApiSchemas } from "@/shared/api/schema";
import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { BoardsListItem } from "../ui/boards-list-item";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { useDeleteBoard } from "../model/use-delete-board";
import { useUpdateFavorite } from "../model/use-update-favorite";
import { UIModal } from "@/shared/ui/modal/ui-modal";
import { Button } from "@/shared/ui/kit/button";

export function BoardItem({ board }: { board: ApiSchemas["Board"] }) {
  const [isShow, setIsShow] = useState(false);

  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  return (
    <>
      <BoardsListItem
        key={board.id}
        board={board}
        rightActions={
          <BoardsFavoriteToggle
            isFavorite={updateFavorite.isOptimisticFavorite(board)}
            onToggle={() => updateFavorite.toggle(board)}
          />
        }
        menuActions={
          <DropdownMenuItem
            variant="destructive"
            disabled={deleteBoard.getIsPending(board.id)}
            onClick={() => setIsShow(true)}
          >
            Удалить
          </DropdownMenuItem>
        }
      />

      <UIModal width="md" isOpen={isShow} onClose={() => setIsShow(false)}>
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
            className="w-full sm:w-auto cursor-pointer transition-colors duration-200 hover:bg-red-400"
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
