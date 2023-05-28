    import { useParams } from "react-router-dom";
    export const ServiceAnalysis = () => {
        const { serviceName } = useParams();
        console.log(useParams());
        return (
            <div>
                <h1>hey this is {serviceName}</h1>
            </div>
        )
}