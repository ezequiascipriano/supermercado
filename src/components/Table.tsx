import React, { ReactNode } from 'react';

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading = false,
  emptyMessage = 'Nenhum dado encontrado',
}: TableProps<T>) {
  const renderCell = (item: T, column: TableColumn<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return item[column.accessor as keyof T];
  };

  if (isLoading) {
    return (
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="p-6 text-center text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                >
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${column.className || ''}`}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;