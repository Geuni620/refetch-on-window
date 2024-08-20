type StatusMapping = {
  id: number;
  name: string;
};

type StatusMapType = Record<string, StatusMapping>;

export const createStatusMapper = (
  statusMap: StatusMapType,
  taskStatus: StatusMapping['name'],
) => {
  return statusMap[taskStatus].id;
};
