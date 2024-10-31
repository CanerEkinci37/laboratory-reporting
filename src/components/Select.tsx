import { LaborantType } from "../types/Laborant";

type SelectProps = {
  id: string; 
  name: string;
  placeholder: string;
  data: LaborantType[];

  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<SelectProps> = ({ id, name, placeholder, data, onChange }) => {
  return (
    <select name={name} id={id} className="input-field" onChange={onChange}>
      <option value="" disabled selected hidden>{placeholder}</option>
      {data.map((dt, i) => (
        <option key={i} value={dt.id}>{dt.name} {dt.surname}</option>
      ))}
    </select>
  );
}

export default Select;
