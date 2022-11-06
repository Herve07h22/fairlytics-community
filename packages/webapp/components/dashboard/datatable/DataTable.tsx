import { Table } from "antd";
import { ReactElement } from "react";

export type Column<T> = {
  title?: string;
  dataIndex: string;
  render?: (record: T) => ReactElement | string;
};

type DataTableProps<T> = {
  keyIndex: string;
  columns: Column<T>[];
  data: T[];
  expandedRowRender?: (record: T) => ReactElement | string;
  noPagination?:boolean
  noHeader?:boolean
};

export function DataTable<T extends object>(props: DataTableProps<T>) {
  const columns = props.columns.map((c) => ({
    ...c,
    render: c.render ? (_:unknown, record: T) => c.render!(record) : undefined,
  }));

  return (
    <Table
      bordered={false}
      dataSource={props.data}
      columns={columns}
      pagination={props.noPagination ? false : { defaultPageSize: 10 }}
      showHeader={!props.noHeader}
      size="small"
      rowKey={props.keyIndex}
    />
  );
}

// expandedRowRender={props.expandedRowRender}
