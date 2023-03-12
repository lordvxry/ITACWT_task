import { FC } from 'react';
import './SearchBar.css';
import { Input, Select } from 'antd';

interface Props {
  fetchData: () => void;
  loading: boolean;
  searchTerm: string;
  filterValue: string;
  setSearchTerm: (value: string) => void;
  setFilterValue: (value: string) => void;
}

const SearchBar: FC<Props> = ({
  searchTerm,
  setSearchTerm,
  filterValue,
  setFilterValue,
  fetchData,
  loading,
}) => {
  const { Option } = Select;

  return (
    <div className="search-bar_container">
      <button onClick={fetchData} disabled={loading}>
        Randomize data
      </button>
      <div className="search-bar_filter-panel">
        <Input
          disabled={loading}
          placeholder={'Search...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          disabled={loading}
          className="search-bar_filter-panel__select"
          value={filterValue}
          onChange={(value) => setFilterValue(value)}
        >
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
        </Select>
      </div>
    </div>
  );
};

export default SearchBar;
