import { Hourglass, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { ReactNode } from "react";

type StatusAppearance = {
  text: string;
  color: string;
  icon?: ReactNode;
};

export const formatStatus = (status: string): StatusAppearance => {
  const statusMap: Record<string, StatusAppearance> = {
    new: {
      text: "Новая",
      color: "bg-blue-200 text-blue-900",
      icon: <Plus size={16} />,
    },
    in_progress: {
      text: "В работе",
      color: "bg-yellow-200 text-yellow-900",
      icon: <Hourglass size={16} />,
    },
    done: {
      text: "Завершено",
      color: "bg-green-200 text-green-800",
      icon: <CheckCircle2 size={16} />,
    },
    rejected: {
      text: "Отклонено",
      color: "bg-red-200 text-red-800",
      icon: <AlertCircle size={16} />,
    },
  };

  if (statusMap[status]) {
    return statusMap[status];
  }

  const formattedText = status
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    text: formattedText,
    color: "bg-purple-200 text-purple-800",
    icon: <span>?</span>,
  };
};
