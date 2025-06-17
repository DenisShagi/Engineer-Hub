import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Link, href } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { AppWindow, CalendarPlus, MoreHorizontalIcon, Phone, UserRound } from "lucide-react";
import { StatusBadge } from "@/shared/ui/status/status-badge";

interface BoardsListItemProps {
  board: {
    id: string;
    name: string;
    createdAt: string;
    lastOpenedAt: string;
    updatedAt: string;
    status?: string;
    phone?: string;
    fullName?: string;
  };
  rightActions?: React.ReactNode;
  menuActions?: React.ReactNode;
}

export function BoardsListItem({
  board,
  rightActions,
  menuActions,
}: BoardsListItemProps) {

  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
      <div className="flex-grow min-w-0">
        <div className="flex gap-2 items-center">
          <Button
            asChild
            variant="link"
            className="text-left justify-start h-auto p-0"
          >
            <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
              <span className="flex items-center gap-2 text-lg font-medium truncate">
                <AppWindow size={20} />
                {board.name}
              </span>
            </Link>
          </Button>
          <span className="text-sm text-gray-500">
            <StatusBadge status={board.status} />
          </span>
        </div>

        <div className="flex gap-2 text-gray-500 mt-1.5 text-sm items-center">
          <UserRound size={20} />
          ФИО: {board.fullName}
        </div>
        <div className="flex gap-2 text-gray-500 mt-1.5 text-sm items-center">
          <Phone size={20} />
          Телефон: {board.phone}
        </div>

        <div className="flex gap-2 text-sm text-gray-500 mt-1.5 items-center">
          <CalendarPlus size={20} />
          <div>Создано: {new Date(board.createdAt).toLocaleDateString()}</div>
          <div>
            Последнее открытие:{" "}
            {new Date(board.lastOpenedAt).toLocaleDateString()}
          </div>
          <div>
            Последнее обновление:{" "}
            {new Date(board.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rightActions}
        {menuActions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">{menuActions}</DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
