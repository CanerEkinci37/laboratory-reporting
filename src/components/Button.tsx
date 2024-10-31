import { Button as MantineButton } from '@mantine/core';

type ButtonProps = {
  btnText: string;
  color: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ btnText, onClick, color }) => {
  return (
    <MantineButton 
      style={{ margin: '10px' }} 
      onClick={(e) => onClick(e)} 
      variant='filled' 
      color={color} 
      size='sm' 
      radius='xl'
    >
      {btnText}
    </MantineButton>
  );
}

export default Button;
