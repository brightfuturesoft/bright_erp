'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button, Card } from 'antd';

export default function Calculator_app() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [displayOperator, setDisplayOperator] = useState<string>('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) return;

            if (/^[0-9]$/.test(e.key)) {
                inputNumber(e.key);
                return;
            }
            if (e.key === '.') {
                inputDecimal();
                return;
            }
            if (e.key === '+') {
                performOperation('+');
                return;
            }
            if (e.key === '-') {
                performOperation('-');
                return;
            }
            if (e.key === '*' || e.key.toLowerCase() === 'x') {
                performOperation('×');
                return;
            }
            if (e.key === '/') {
                performOperation('÷');
                return;
            }
            if (e.key === '%') {
                performOperation('%');
                return;
            }
            if (e.key === '=' || e.key === 'Enter') {
                handleEquals();
                return;
            }
            if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
                clear();
                return;
            }
            if (e.key === 'Backspace') {
                backspace();
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [display, previousValue, operation, waitingForOperand]);

    const inputNumber = (num: string) => {
        if (waitingForOperand) {
            setDisplay(num);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
        setDisplayOperator('');
    };

    const backspace = () => {
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    };

    const performOperation = (nextOperation: string) => {
        const inputValue = Number.parseFloat(display);
        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }
        setWaitingForOperand(true);
        setOperation(nextOperation);
        setDisplayOperator(
            `${previousValue !== null ? previousValue : inputValue} ${nextOperation}`
        );
    };

    const calculate = (
        firstValue: number,
        secondValue: number,
        operation: string
    ) => {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '×':
                return firstValue * secondValue;
            case '÷':
                return firstValue / secondValue;
            case '%':
                // Percent: calculates "firstValue * (secondValue / 100)"
                return firstValue * (secondValue / 100);
            case '=':
                return secondValue;
            default:
                return secondValue;
        }
    };

    const handleEquals = () => {
        const inputValue = Number.parseFloat(display);
        if (previousValue !== null && operation) {
            const newValue = calculate(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
            setDisplayOperator('');
        }
    };

    return (
        <div>
            <Card>
                <div className="mb-4 p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-black">
                    {/* Operator Display */}
                    <div className="text-right text-base font-mono text-gray-400 min-h-[24px] mb-1">
                        {displayOperator}
                    </div>
                    {/* Main Display */}
                    <div className="text-right text-3xl font-mono overflow-hidden">
                        {display}
                    </div>
                </div>
                {/* Button Grid */}
                <div className="grid grid-cols-4 gap-3">
                    {/* Row 1 */}
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={clear}
                    >
                        C
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={backspace}
                    >
                        ⌫
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => performOperation('÷')}
                    >
                        ÷
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90"
                        onClick={() => performOperation('×')}
                    >
                        ×
                    </Button>
                    {/* Row 2 */}

                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('7')}
                    >
                        7
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('8')}
                    >
                        8
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('9')}
                    >
                        9
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90"
                        onClick={() => performOperation('-')}
                    >
                        -
                    </Button>
                    {/* Row 3 */}
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('4')}
                    >
                        4
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('5')}
                    >
                        5
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('6')}
                    >
                        6
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90"
                        onClick={() => performOperation('+')}
                    >
                        +
                    </Button>
                    {/* Row 4 */}
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('1')}
                    >
                        1
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('2')}
                    >
                        2
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={() => inputNumber('3')}
                    >
                        3
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90"
                        onClick={() => performOperation('%')}
                    >
                        %
                    </Button>
                    {/* Last row: 0 (col-span-2), ., = (col-span-2) */}
                    <Button
                        className="h-14 text-lg font-semibold col-span-2 bg-transparent"
                        onClick={() => inputNumber('0')}
                    >
                        0
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold bg-transparent"
                        onClick={inputDecimal}
                    >
                        .
                    </Button>
                    <Button
                        className="h-14 text-lg font-semibold  bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={handleEquals}
                    >
                        =
                    </Button>
                </div>
            </Card>
        </div>
    );
}
