import { FC } from 'react';
import './Main-page.css';
import { DataTable } from '../../modules/DataTable';

const MainPage: FC = () => {
  return (
    <div className="Main-page">
      <DataTable />
    </div>
  );
};

export default MainPage;
