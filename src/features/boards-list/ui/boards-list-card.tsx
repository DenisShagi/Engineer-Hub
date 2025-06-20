import { ROUTES } from "@/shared/model/routes";
import { StatusBadge } from "@/shared/ui/status/status-badge";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Link, href } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";
import {
  BookOpenText,
  CalendarPlus,
  Phone,
  RefreshCw,
  UserRound,
} from "lucide-react";

interface BoardsListCardProps {
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
  rightTopActions?: React.ReactNode;
  bottomActions?: React.ReactNode;
}

export function BoardsListCard({
  board,
  bottomActions,
  rightTopActions,
}: BoardsListCardProps) {
  return (
    <Card className="relative">
      {<div className="absolute top-2 right-2">{rightTopActions}</div>}
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="link"
            className="text-left justify-start h-auto p-0"
          >
            <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xl font-medium truncate max-w-[260px]">
                    {board.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{board.name}</TooltipContent>
              </Tooltip>
            </Link>
          </Button>
          <div className="text-sm text-gray-500">
            <StatusBadge status={board.status}  />
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <UserRound size={20} />
            ФИО: {board.fullName}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Phone size={20} />
            Телефон: {board.phone}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <CalendarPlus size={20} />
            Создано: {new Date(board.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <BookOpenText size={20} />
            Последнее открытие:{" "}
            {new Date(board.lastOpenedAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <RefreshCw size={20} />
            Последнее обновление:{" "}
            {new Date(board.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      {bottomActions && <CardFooter>{bottomActions}</CardFooter>}
    </Card>
  );
}
