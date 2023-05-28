import CountUp from 'react-countup';
import { Loading } from '../utilities/Loading';
export const Stats = (props) => {
    const stats = [
        { id: 1, name: 'Cost per Hour', value: parseFloat(props.sumOfCostPerHour) },
        { id: 2, name: 'Cost per Month', value: parseFloat(props.sumOfCostPerMonth) },
        { id: 3, name: 'Cost per year', value: parseFloat(props.sumOfCostPerYear) },
    ]
    const diffBetweenPricePercentage = ((props.sumOfCostPerMonth - props.prevMonthTotalCost) / (props.prevMonthTotalCost))*100;
    console.log((props.sumOfCostPerMonth-props.prevMonthTotalCost)/props.prevMonthTotalCost);
    return (
        <div>
            {props.sumOfCostPerHour ? (
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                            {stats.map((stat) => (
                                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                    <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                    <dt className="text-base leading-7 text-gray-600" style={{ color: diffBetweenPricePercentage > 0 ? 'red' : diffBetweenPricePercentage < 0 ? 'green' : 'inherit' }}>
                                        {stat.name === "Cost per Month" && (
                                            <div>
                                                {diffBetweenPricePercentage > 0 && <span style={{ marginLeft: '0.25rem' }}>&uarr; up by {<CountUp end={diffBetweenPricePercentage.toFixed(3)} duration={2} decimals={2} delay={0} />}%</span>}
                                                {diffBetweenPricePercentage < 0 && <span style={{ marginLeft: '0.25rem' }}>&darr; down by {<CountUp end={Math.abs(diffBetweenPricePercentage.toFixed(3))} duration={2} decimals={2} delay={0} />}%</span>}
                                            </div>
                                        )}
                                    </dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                        $ {<CountUp end={stat.value.toFixed(3)} duration={2} decimals={2} delay={0} />}
                                    </dd>

                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            ) : (
                <Loading />
            )}

        </div>
    )
}
