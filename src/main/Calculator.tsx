import React, { useState } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

export default function Calculator() {

    const[displayValue, setDisplayValue] = useState<any>('0');
    const[clearDisplay, setClearDisplay] = useState<boolean>(false);
    const[operator, setOperation] = useState<null | string>(null);
    const[values, setValues] = useState<number[]>([0,0]);
    const[current, setCurrent] = useState<number>(0);

    function clearMemory() {
        setDisplayValue('0');
        setClearDisplay(false);
        setOperation(null);
        setValues([0,0]);
        setCurrent(0);
    }

    function IncludeOperation(operation: string) {
        if (current === 0) {
            setOperation(operation);
            setCurrent(1);
            setClearDisplay(true);
        } else {
            const equals = operation === '='
            const currentOperation = operator

            const Newvalues = [...values]

            try {
                Newvalues[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                Newvalues[0] = values[0]
            }

            Newvalues[1] = 0

            setDisplayValue(Newvalues[0]);
            setOperation(equals ? null : operation);
            setCurrent(equals ? 0 : 1);
            setClearDisplay(!equals)
            setValues(Newvalues);
        }
    }

    function addDigit(n: string) {
        if (n === '.' && displayValue.includes('.')) {
            return
        }
        const cleared = displayValue === '0' || clearDisplay;
        const currentValue = cleared ? '' : displayValue
        const newDisplayValue = currentValue + n

        setDisplayValue(newDisplayValue);
        setClearDisplay(false);

        if (n !== '.') {
            const i = current
            const newValue = parseFloat(newDisplayValue)
            const value = [...values]
            value[i] = newValue
            setValues(value);
        }
    }

    return (
        <div className="calculator">
            <Display value={displayValue} />
            <Button label="AC" click={clearMemory} triple />
            <Button label="/" click={IncludeOperation} operation />
            <Button label="7" click={addDigit} />
            <Button label="8" click={addDigit} />
            <Button label="9" click={addDigit} />
            <Button label="*" click={IncludeOperation} operation />
            <Button label="4" click={addDigit} />
            <Button label="5" click={addDigit} />
            <Button label="6" click={addDigit} />
            <Button label="-" click={IncludeOperation} operation />
            <Button label="1" click={addDigit} />
            <Button label="2" click={addDigit} />
            <Button label="3" click={addDigit} />
            <Button label="+" click={IncludeOperation} operation />
            <Button label="0" click={addDigit} double />
            <Button label="." click={addDigit} />
            <Button label="=" click={IncludeOperation} operation />
        </div>
    )
}
