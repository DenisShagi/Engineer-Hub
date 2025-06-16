type StatusAppearance = {
  text: string;
  color: string;
  icon: string;
};

export const formatStatus = (status: string): StatusAppearance => {
  const statusMap: Record<string, StatusAppearance> = {
    new: {
      text: "Новая",
      color: "bg-gray-200 text-gray-800",
      icon: "n",
    },
    in_progress: {
      text: "В работе",
      color: "bg-yellow-200 text-yellow-900",
      icon: "w",
    },
    done: {
      text: "Завершено",
      color: "bg-green-200 text-green-800",
      icon: "c",
    },
    rejected: {
      text: "Отклонено",
      color: "bg-red-200 text-red-800",
      icon: "x",
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
