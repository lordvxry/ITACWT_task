import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import { useDataForTable } from '../../store/store';
import { getColumns } from '../../utils/getColumns';
import { validateAndFormatDataMapper } from '../../utils/validateAndFormatDataMapper';
import SearchBar from '../SearchBar/SearchBar';
import EditModal from '../EditModal/EditModal';
import { EditableContentModel } from '../../models/EditableContentModel';
import { FormattedDataObjectModel } from '../../models/FormattedDataObjectModel';

export const DataTable = () => {
  const {
    data,
    isLoading: dataIsLoading,
    fetchData,
    updateDataItemValue,
  } = useDataForTable();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EditableContentModel | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const formattedData = useMemo(() => data.map(validateAndFormatDataMapper), [data]);

  const columns = useMemo(() => {
    const result = getColumns(formattedData);
    if (result.length) {
      result.push({
        title: 'Edit',
        dataIndex: 'edit',
        render: (_value: unknown, record: FormattedDataObjectModel) => (
          <Button
            onClick={() => {
              setModalVisible(true);
              setSelectedRow(record.content);
            }}
          >
            Edit
          </Button>
        ),
      });
    }
    return result;
  }, [formattedData]);

  const filteredData = useMemo(() => {
    if (filterValue === 'all') {
      return formattedData;
    }
    return formattedData.filter(
      (item: FormattedDataObjectModel) => item.status === filterValue,
    );
  }, [formattedData, filterValue]);

  const finalSearchedData = useMemo(() => {
    return filteredData.filter((item: FormattedDataObjectModel) => {
      const itemValues = Object.values(item).join('').toLowerCase();
      return itemValues.includes(searchTerm.toLowerCase());
    });
  }, [filteredData, searchTerm]);

  return (
    <>
      <SearchBar
        setSearchTerm={setSearchTerm}
        setFilterValue={setFilterValue}
        searchTerm={searchTerm}
        filterValue={filterValue}
        fetchData={fetchData}
        loading={dataIsLoading}
      />
      <Table
        columns={columns}
        dataSource={finalSearchedData}
        loading={dataIsLoading}
        scroll={{ y: '55vh' }}
      />
      <EditModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedRow={selectedRow}
        updateDataItemValue={updateDataItemValue}
      />
    </>
  );
};
