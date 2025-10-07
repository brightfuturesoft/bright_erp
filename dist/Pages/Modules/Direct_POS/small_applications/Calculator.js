'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
export default function Calculator_app() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [displayOperator, setDisplayOperator] = useState('');
    useEffect(() => {
        const handleKeyDown = e => {
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
    const inputNumber = num => {
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
    const performOperation = nextOperation => {
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
    const calculate = (firstValue, secondValue, operation) => {
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
    return _jsx('div', {
        children: _jsxs(Card, {
            children: [
                _jsxs('div', {
                    className:
                        'mb-4 p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-black',
                    children: [
                        _jsx('div', {
                            className:
                                'text-right text-base font-mono text-gray-400 min-h-[24px] mb-1',
                            children: displayOperator,
                        }),
                        _jsx('div', {
                            className:
                                'text-right text-3xl font-mono overflow-hidden',
                            children: display,
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'grid grid-cols-4 gap-3',
                    children: [
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: clear,
                            children: 'C',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: backspace,
                            children: '\u232B',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => performOperation('÷'),
                            children: '\u00F7',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90',
                            onClick: () => performOperation('×'),
                            children: '\u00D7',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('7'),
                            children: '7',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('8'),
                            children: '8',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('9'),
                            children: '9',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90',
                            onClick: () => performOperation('-'),
                            children: '-',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('4'),
                            children: '4',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('5'),
                            children: '5',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('6'),
                            children: '6',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90',
                            onClick: () => performOperation('+'),
                            children: '+',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('1'),
                            children: '1',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('2'),
                            children: '2',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: () => inputNumber('3'),
                            children: '3',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-primary text-white hover:bg-primary/90',
                            onClick: () => performOperation('%'),
                            children: '%',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold col-span-2 bg-transparent',
                            onClick: () => inputNumber('0'),
                            children: '0',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold bg-transparent',
                            onClick: inputDecimal,
                            children: '.',
                        }),
                        _jsx(Button, {
                            className:
                                'h-14 text-lg font-semibold  bg-accent text-accent-foreground hover:bg-accent/90',
                            onClick: handleEquals,
                            children: '=',
                        }),
                    ],
                }),
            ],
        }),
    });
}
