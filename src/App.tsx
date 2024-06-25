import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button} from './components/Button';
import s from './components/Button.module.css'
import sa from './App.module.css'
import {Input} from './components/Input';
import si from './components/Input.module.css'

function App() {
    // Инициализация состояния count из localStorage или с нуля, если значение отсутствует
    const [count, setCount] = useState(() => {
        const valueCount = localStorage.getItem('counterValue');
        return valueCount ? JSON.parse(valueCount) : 0;
    })
    // Инициализация состояния startValue из localStorage или с нуля, если значение отсутствует

    let [startValue, setStartValue] = useState(() => {
        const newStartValue = localStorage.getItem('startValue');
        return newStartValue ? JSON.parse(newStartValue) : 0;
    });
    // Инициализация состояния maxValue из localStorage или с нуля, если значение отсутствует

    let [maxValue, setMaxValue] = useState(() => {
        const newMaxValue = localStorage.getItem('maxValue');
        return newMaxValue ? JSON.parse(newMaxValue) : 0;
    });
    // Добавление состояния для сообщения
    const [message, setMessage] = useState('');
    // добавление состояния для кнопки "set" для дизейбла
    const [setButtonDisabled, setSetButtonDisabled] = useState(true);

    const incBtnHandler = () => {
        setCount(count + 1)
    }
    const decBtnHandler = () => {
        setCount(count - 1)
    }
    const resetBtnHandler = () => {
        setCount(startValue)
    }
    const setBtnHandler = () => {
        console.log('setButtonDisabled')
        localStorage.setItem('counterValue', JSON.stringify(startValue))
        localStorage.setItem('startValue', JSON.stringify(startValue));
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
        setCount(startValue)
        setMessage(''); // Очистка сообщения
        setSetButtonDisabled(true); // Деактивация кнопки "Set"

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target; // Деструктуризация события для получения имени поля и его значения
        const numericValue = Number(value.replace(/[.,].*/g, ''));// Удаляем точки и запятые из значения
        console.log('onChangeHandler - numericValue', numericValue, name)

        // Установка значений и активация кнопки "Set"
        if (name === 'startValue') {
            setStartValue(numericValue);
        } else if (name === 'maxValue') {
            setMaxValue(numericValue);
        }

        if (name === 'startValue' && numericValue < 0) {
            setMessage('Incorrect value!');
            setSetButtonDisabled(true)
        } else if(name === 'startValue' && numericValue >= maxValue){
            setMessage('Max value must be greater than start value!');
            setSetButtonDisabled(true);
        } else if (name === 'maxValue' && numericValue < 0) {
            setMessage('Incorrect value!');
            setSetButtonDisabled(true);
        } else if (name === 'maxValue' && numericValue <= startValue) {
            setMessage('Max value must be greater than start value!');
            setSetButtonDisabled(true);
        } else {
            setMessage('Enter Values and press "Set"');
            setSetButtonDisabled(false);
        }
    }
    const isButtonDisabled = startValue >= maxValue || startValue < 0 || maxValue <= 0;

    return (<div className={`${sa.App}`}>
            {/*///////input sets/////////////*/}
            <div className={`${sa.counter}`}>
                <div className={`${sa.inputWrapper}`}>
                    <span className={`${sa.inputSpan}`}>max value:</span>
                    <Input nameInput={'maxValue'} value={maxValue}
                           onChange={onChangeHandler}
                           className={isButtonDisabled ? si.inputError : si.customInput}/>
                </div>
                <div className={`${sa.inputWrapper}`}>
                    <span className={`${sa.inputSpan}`}>start value:</span>
                    <Input nameInput={'startValue'} value={startValue}
                           onChange={onChangeHandler} className={isButtonDisabled ? si.inputError : si.customInput}/>
                </div>
                <Button onClick={setBtnHandler}
                        className={(setButtonDisabled || isButtonDisabled) ? s.btnDis : s.btn}
                        disabled={setButtonDisabled || isButtonDisabled}>{'set'}</Button>
            </div>
            {/*///////counter/////////////*/}
            <div className={`${count === maxValue ? sa.counterMax : ''} ${sa.counter}`}>
                <div
                    className={message
                        ? sa.showText
                        : `${count === maxValue
                            ? sa.showNumberRed
                            : ''} ${sa.showNumber}`}>{message || count}</div>
                <div className={sa.btnWrapper}>
                    <Button onClick={incBtnHandler}
                            disabled={count === maxValue}
                            className={count === maxValue ? s.btnDis : s.btn}>{'inc'}</Button>
                    <Button onClick={decBtnHandler}
                            disabled={count === startValue}
                            className={count === startValue ? s.btnDis : s.btn}>{'dec'}</Button>
                    <Button onClick={resetBtnHandler}
                            disabled={count === startValue}
                            className={count === startValue ? s.btnDis : s.btn}>{'reset'}</Button>

                </div>
            </div>
        </div>
    );
}

export default App;

// if (name === 'startValue') {
//     setStartValue(numericValue);
// } else if (name === 'maxValue') {
//     setMaxValue(numericValue);
// }