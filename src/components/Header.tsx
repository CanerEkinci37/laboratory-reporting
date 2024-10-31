import { IoMdPersonAdd } from "react-icons/io";
import { TiDocumentAdd } from "react-icons/ti";
import { laborantModalFunc } from '../redux/laborantModalSlice';
import { reportModalFunc } from '../redux/reportModalSlice';
import { useDispatch } from "react-redux";
import { searchReportFunc, sortReportFunc } from "../redux/reportDataSlice";
import { Select } from "@mantine/core";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header-left">
        <h1>Laboratory Reporting</h1>
      </div>
      <div className="header-right">
        <div className="sort-container">
          <Select
            size='md'
            radius='md'
            placeholder='Tarihe Göre Sırala'
            data={[
              { value: 'asc', label: 'Artan' },
              { value: 'desc', label: 'Azalan' }
            ]}
            onChange={(value) => dispatch(sortReportFunc(value as 'asc' | 'desc'))}
          />
        </div>
        <input 
          type="text" 
          placeholder="Arama yapınız..." 
          className="search-bar" 
          onChange={(e) => dispatch(searchReportFunc(e.target.value))}
        />
        <IoMdPersonAdd size={30} style={{ cursor: 'pointer' }} onClick={() => dispatch(laborantModalFunc())} />
        <TiDocumentAdd size={42} style={{ cursor: 'pointer', padding: '5px' }} onClick={() => dispatch(reportModalFunc())} />
      </div>
    </div> 
  );
};

export default Header;
