export const Months = () => {
    return (
        <div className="months">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        View PieChart Analysis of your services
                    </div>
                    <div className="flip-card-back">
                        <a href="/pie-chart-monthly-analysis">View</a>
                    </div>
                </div>
            </div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        View Month to Month Analysis
                    </div>
                    <div className="flip-card-back">
                        <a href="/month-to-month-analysis">View</a>
                    </div>
                </div>
            </div>
        </div>


    )
}