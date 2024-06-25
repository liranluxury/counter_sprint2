import {ChangeEvent, InputHTMLAttributes, useState} from 'react';
import si from './Input.module.css'

type InputProps = {
    nameInput: string
    value: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void

} & InputHTMLAttributes<HTMLInputElement>;
export const Input = ({nameInput, value, onChange, ...restProps}: InputProps) => {

    const [newItemValue, setNewItemValue] = useState<number>(value);
    const [error, setError] = useState<string | null>(null);
    const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
       // const value = parseFloat(e.currentTarget.value);
        const numericValue = Number(e.currentTarget.value.replace(/[.,].*/g, ''));// Удаляем точки и запятые из значения
        if (!isNaN(numericValue)) {
            setNewItemValue(numericValue);
            onChange(e);
            setError(null);

        } else {
            setNewItemValue(numericValue); // сохраняем текущий ввод
            setError('Invalid number');
        }
    }
    return (
        <div>
            <input
                type={'number'}
                name={nameInput}
                value={newItemValue}
                onChange={changeItemHandler}
                className={si.customInput}
                {...restProps}
            />
            {error && <span className="error">{error}</span>}

        </div>
    );
};