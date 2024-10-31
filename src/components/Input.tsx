import React from 'react';
import { TextInput } from '@mantine/core';

type InputProps = {
    id: string;
    type: string;
    name: string;
    placeholder: string;
    maxLength?: number;
    value?: string | Date;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, name, type, placeholder, maxLength, value, onChange }) => {
    let content;

    if (type === 'text') { 
        content = (
            <TextInput 
                id={id} 
                name={name} 
                placeholder={placeholder} 
                maxLength={maxLength} 
                onChange={onChange} 
                value={value?.toString()} 
                radius='md' 
                variant='filled' 
                style={{
                    marginBottom:'15px'
                }}
            />
        );
    } else {
        content = (
            <input 
                id={id} 
                name={name} 
                type={type} 
                placeholder={placeholder} 
                maxLength={maxLength} 
                onChange={onChange} 
                value={value?.toString()} 
                className="input-field" 
                style={{
                    marginBottom:'15px'
                }}
            />
        );
    }

    return (
        <div className="input-group">
            {content}
        </div>
    );
}

export default Input;
