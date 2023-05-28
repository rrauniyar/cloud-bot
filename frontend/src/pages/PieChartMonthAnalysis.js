import { myAxiosAws } from '../services/helperAws';
import { useState } from "react";
import PieChart from '../utilities/PieChart';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
export const PieChartMonthAnalysis = () => {

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [data, setdata] = useState('');
    function HandleSubmit(event) {
        event.preventDefault();
        fetchData();
    }

    async function fetchData() {
        try {

            const response = await myAxiosAws.get("/service-costs", { params: { year, month } });
            const dateKey = `${year}-${month}-01`;
            console.log(response.data);
            for (const [key, value] of Object.entries(response.data)) {
                if (parseInt(key) === parseInt(dateKey)) {
                    setdata(value);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const servicesArray = Object.keys(data);
    const costData = Object.values(data);
    return (
        <div>

            {data ? (
                <div>
                    <PieChart servicesArray={servicesArray} costData={costData} />
                </div>
            ) : (

                <div className='pie-chart-analysis'>
                    <form onSubmit={HandleSubmit}>
                        <TextField type="number" id="standard-basic" variant="standard" placeholder="Enter month" value={month} onChange={(e) => setMonth(e.target.value)} />
                        <TextField type="number" id="standard-basic" variant="standard" placeholder="Enter year" value={year} onChange={(e) => setYear(e.target.value)} />
                        <Button variant="contained" endIcon={<SendIcon />} type="submit" className='piechart-button'>
                            Check
                        </Button>
                    </form>
                </div>
            )}

        </div>
    )
}




