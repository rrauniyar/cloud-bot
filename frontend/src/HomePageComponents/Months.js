


import React, { useState } from 'react';


export const Months = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const cards = [
        {
            content: 'View PieChart Analysis of your services',
            link: '/pie-chart-monthly-analysis'
        },
        {
            content: 'View Month to Month Analysis',
            link: '/month-to-month-analysis'
        },
        {
            content: 'View Details of the S3Buckets',
            link: '/S3Buckets'
        },
        {
            content: 'View EC2 Instances Info',
            link: '/EC2Instances'

        }
    ];

    const handlePrevCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handleCircleClick = (index) => {
        setCurrentCardIndex(index);
    };

    return (
        <div className="months">
            <div className="card-container">
                <div className="arrow-button prev-button" onClick={handlePrevCard}>
                    &lt;
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {cards[currentCardIndex].content}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {cards[currentCardIndex].content}
                    </p>
                    <a
                        href={cards[currentCardIndex].link}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Learn more
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </div>
                <div className="arrow-button next-button" onClick={handleNextCard}>
                    &gt;
                </div>
            </div>
            <div className="circles-list">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        style={{ cursor: 'pointer' }}
                        className={`w-3 h-3 rounded-full bg-blue-500 ${index === currentCardIndex ? 'active' : ''
                            }`}
                        onClick={() => handleCircleClick(index)}
                    ></div>
                ))}
            </div>
        </div>
    );  
};

export default Months;

