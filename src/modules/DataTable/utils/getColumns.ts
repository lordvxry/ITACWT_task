import { createTitle } from './trimToFirstCapital';
import { ColumnType } from 'antd/es/table';
import { FormattedDataObjectModel } from '../models/FormattedDataObjectModel';

type DataTableColumns = ColumnType<FormattedDataObjectModel>[];

const exclusionFields = ['id', 'key', 'content'];
export const getColumns = (dataArray: FormattedDataObjectModel[]): DataTableColumns => {
  if (!dataArray.length) return [];
  const keys = Object.keys(dataArray[0]);

  return keys
    .filter((item) => !exclusionFields.includes(item))
    .map((item) => ({
      title: createTitle(item),
      dataIndex: item,
    }));
};
