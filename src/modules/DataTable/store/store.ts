import { create } from 'zustand';
import * as services from '../api/dataTableApi';
import { DataObjectModel } from '../models/DataObjectModel';
import { EditableContentModel } from '../models/EditableContentModel';

interface DataForTableState {
  data: DataObjectModel[];
  isLoading: boolean;
  fetchData: () => void;
  updateDataItemValue: (item: EditableContentModel) => void;
}

export const useDataForTable = create<DataForTableState>((setState) => ({
  data: [],
  isLoading: false,
  fetchData: async () => {
    setState({ isLoading: true });

    const result = await services.getData();

    setState({
      data: result as DataObjectModel[],
      isLoading: false,
    });
  },
  updateDataItemValue: ({ id, key, value }) => {
    setState((state) => ({
      data: state.data.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }));
  },
}));
