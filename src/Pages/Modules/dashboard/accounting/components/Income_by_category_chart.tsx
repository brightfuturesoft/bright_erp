/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const Income_by_categoryChart: React.FC = () => {
    let chartInstance1: Chart | null = null;
    let chartInstance2: Chart | null = null;
    let chartInstance3: Chart | null = null; // Add a reference for the third chart

    useEffect(() => {
        // Create a new chart instance for the first chart (Income Categories)
        const ctx1 = document.getElementById(
            'pie-chart-1'
        ) as HTMLCanvasElement;
        if (ctx1) {
            chartInstance1 = new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: [
                        'Uncategorized Income',
                        'Sales',
                        'Demo Income',
                        'Discount Given',
                        'Extra Income',
                    ],
                    datasets: [
                        {
                            label: 'Amount',
                            data: [120, 250, 100, 80, 50],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)', // Uncategorized Income
                                'rgba(54, 162, 235, 0.5)', // Sales
                                'rgba(75, 192, 192, 0.5)', // Demo Income
                                'rgba(255, 206, 86, 0.5)', // Discount Given
                                'rgba(153, 102, 255, 0.5)', // Extra Income
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: '',
                        },
                    },
                },
            });
        }

        // Create a new chart instance for the second chart (Expense Categories)
        const ctx2 = document.getElementById(
            'pie-chart-2'
        ) as HTMLCanvasElement;
        if (ctx2) {
            chartInstance2 = new Chart(ctx2, {
                type: 'pie',
                data: {
                    labels: [
                        'Payroll-Salary & Wages',
                        'Bank Service Charges',
                        'Advertising & Promotion',
                        'Uncategorized',
                    ],
                    datasets: [
                        {
                            label: 'Amount',
                            data: [30, 50, 10, 10],
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.5)', // Payroll-Salary & Wages
                                'rgba(75, 192, 192, 0.5)', // Bank Service Charges
                                'rgba(153, 102, 255, 0.5)', // Advertising & Promotion
                                'rgba(255, 206, 86, 0.5)', // Uncategorized
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: '',
                        },
                    },
                },
            });
        }

        // Create a new chart instance for the third chart (Payroll, Bank Service Charges, Advertising, Uncategorized)
        const ctx3 = document.getElementById(
            'pie-chart-3'
        ) as HTMLCanvasElement;
        if (ctx3) {
            chartInstance3 = new Chart(ctx3, {
                type: 'pie',
                data: {
                    labels: [
                        'Payroll-Salary & Wages',
                        'Bank Service Charges',
                        'Advertising & Promotion',
                        'Uncategorized',
                    ],
                    datasets: [
                        {
                            label: 'Amount',
                            data: [30, 50, 10, 10],
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.5)', // Payroll-Salary & Wages
                                'rgba(75, 192, 192, 0.5)', // Bank Service Charges
                                'rgba(153, 102, 255, 0.5)', // Advertising & Promotion
                                'rgba(255, 206, 86, 0.5)', // Uncategorized
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: '',
                        },
                    },
                },
            });
        }

        // Cleanup function
        return () => {
            // Destroy the chart instances when the component unmounts
            if (chartInstance1) {
                chartInstance1.destroy();
            }
            if (chartInstance2) {
                chartInstance2.destroy();
            }
            if (chartInstance3) {
                chartInstance3.destroy(); // Destroy the third chart instance
            }
        };
    }, []);

    return (
        <div className="gap-6 border-gray-200 dark:border-gray-700 grid md:grid-cols-2 mt-10 pt-4 border-t">
            <div className="flex flex-col bg-[#fff] dark:bg-light-dark dark:ring-0 items-center shadow-xl dark:shadow-none rounded overflow-hidden ring-1 ring-gray-300">
                <header className="flex items-center bg-gray-700 px-3 w-full h-[50px] capitalize">
                    Income By Category
                </header>
                <div className="p-2">
                    <canvas
                        id="pie-chart-1"
                        width="400"
                        height="400"
                    ></canvas>
                </div>
            </div>

            <div className="flex flex-col bg-[#fff] dark:bg-light-dark dark:ring-0 items-center shadow-xl dark:shadow-none rounded overflow-hidden ring-1 ring-gray-300">
                <header className="flex items-center bg-gray-700 px-3 w-full h-[50px] capitalize">
                    Expense Categories
                </header>
                <div className="p-2">
                    <canvas
                        id="pie-chart-2"
                        width="400"
                        height="400"
                    ></canvas>
                </div>
            </div>
        </div>
    );
};

export default Income_by_categoryChart;
