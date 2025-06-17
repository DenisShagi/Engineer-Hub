type StatusAppearance = {
  text: string;
  color: string;
  icon?: string;
};

export const formatStatus = (status: string): StatusAppearance => {
  const statusMap: Record<string, StatusAppearance> = {
    new: {
      text: "Новая",
      color: "bg-blue-200 text-blue-900",
    },
    in_progress: {
      text: "В работе",
      color: "bg-yellow-200 text-yellow-900",
    },
    done: {
      text: "Завершено",
      color: "bg-green-200 text-green-800",
    },
    rejected: {
      text: "Отклонено",
      color: "bg-red-200 text-red-800",
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
    icon: "?",
  };
};
