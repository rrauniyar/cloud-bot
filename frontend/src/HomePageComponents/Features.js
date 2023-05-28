
import { ViewServices } from '../HomePageComponents/ViewServices';
import { useState } from 'react';
import { ServicesList } from '../HomePageComponents/ServicesList';
export const Features = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleCardClick = () => {
        setIsFlipped(true);
    };

    const handleBackButtonClick = () => {
        setIsFlipped(false);
    };
    const data = props.data;
    return (
        <div className="features">
            <div className={`features__item ${isFlipped ? 'hidden' : ''}`}>
                <div className={`flip-card ${isFlipped ? '' : 'flipped'}`}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front" onClick={handleCardClick}>
                            View Detailed analysis about ur services
                        </div>
                        <div className="flip-card-back">
                            <div className="popup-content">
                                <ViewServices Data={data} />
                                <button className="back-button" onClick={handleBackButtonClick}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`features__item ${isFlipped ? 'hidden' : ''}`}>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front"></div>
                        view all ur services
                        <div className="flip-card-back">
                            <div className="popup-content">
                                <ServicesList data={data} />
                                <button className="back-button" onClick={handleBackButtonClick}>
                                    Go Back
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={`features__item ${isFlipped ? 'hidden' : ''}`}>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front"></div>
                        <div className="flip-card-back"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}