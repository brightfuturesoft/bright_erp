/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const IncomeByCategoryChart: React.FC = () => {
    let chartInstance1: Chart | null = null;
    let chartInstance2: Chart | null = null;
    let chartInstance3: Chart | null = null;  // Add a reference for the third chart

    useEffect(() => {
        // Create a new chart instance for the first chart (Income Categories)
        const ctx1 = document.getElementById('pie-chart-1') as HTMLCanvasElement;
        if (ctx1) {
            chartInstance1 = new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: ["Uncategorized Income", "Sales", "Demo Income", "Discount Given", "Extra Income"],
                    datasets: [
                        {
                            label: "Amount",
                            data: [120, 250, 100, 80, 50],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',   // Uncategorized Income
                                'rgba(54, 162, 235, 0.5)',   // Sales
                                'rgba(75, 192, 192, 0.5)',   // Demo Income
                                'rgba(255, 206, 86, 0.5)',   // Discount Given
                                'rgba(153, 102, 255, 0.5)'   // Extra Income
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(153, 102, 255, 1)'
                            ],
                            borderWidth: 1,
                        }
                    ]
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
                            text: ''
                        }
                    }
                }
            });
        }

        // Create a new chart instance for the second chart (Expense Categories)
        const ctx2 = document.getElementById('pie-chart-2') as HTMLCanvasElement;
        if (ctx2) {
            chartInstance2 = new Chart(ctx2, {
                type: 'pie',
                data: {
                    labels: ["Payroll-Salary & Wages", "Bank Service Charges", "Advertising & Promotion", "Uncategorized"],
                    datasets: [
                        {
                            label: "Amount",
                            data: [30, 50, 10, 10],
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.5)',   // Payroll-Salary & Wages
                                'rgba(75, 192, 192, 0.5)',   // Bank Service Charges
                                'rgba(153, 102, 255, 0.5)',   // Advertising & Promotion
                                'rgba(255, 206, 86, 0.5)'   // Uncategorized
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 206, 86, 1)'
                            ],
                            borderWidth: 1,
                        }
                    ]
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
                        }
                    }
                }
            });
        }

        // Create a new chart instance for the third chart (Payroll, Bank Service Charges, Advertising, Uncategorized)
        const ctx3 = document.getElementById('pie-chart-3') as HTMLCanvasElement;
        if (ctx3) {
            chartInstance3 = new Chart(ctx3, {
                type: 'pie',
                data: {
                    labels: ["Payroll-Salary & Wages", "Bank Service Charges", "Advertising & Promotion", "Uncategorized"],
                    datasets: [
                        {
                            label: "Amount",
                            data: [30, 50, 10, 10],
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.5)',   // Payroll-Salary & Wages
                                'rgba(75, 192, 192, 0.5)',   // Bank Service Charges
                                'rgba(153, 102, 255, 0.5)',   // Advertising & Promotion
                                'rgba(255, 206, 86, 0.5)'   // Uncategorized
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 206, 86, 1)'
                            ],
                            borderWidth: 1,
                        }
                    ]
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
                        }
                    }
                }
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
                chartInstance3.destroy();  // Destroy the third chart instance
            }
        };
    }, []);

    return (
        <div className='grid md:grid-cols-2 gap-6 border-t dark:border-gray-700 border-gray-200 pt-4 mt-10'>
            <div className='dark:bg-light-dark bg-[#fff] dark:ring-0 ring-1 ring-gray-300 dark:shadow-none shadow-xl flex flex-col items-center rounded overflow-hidden'>
                <header className='capitalize h-[50px] px-3 flex items-center bg-gray-700 w-full'>
                    Income By Category
                </header>
                <div className="p-2">
                    <canvas id="pie-chart-1" width="400" height="400"></canvas>
                </div>
            </div>

            <div className='dark:bg-light-dark bg-[#fff] dark:ring-0 ring-1 ring-gray-300 dark:shadow-none shadow-xl flex flex-col items-center rounded overflow-hidden'>
                <header className='capitalize h-[50px] px-3 flex items-center bg-gray-700 w-full'>
                    Expense Categories
                </header>
                <div className="p-2">
                    <canvas id="pie-chart-2" width="400" height="400"></canvas>
                </div>
            </div>
        </div>
    );
};

export default IncomeByCategoryChart;
