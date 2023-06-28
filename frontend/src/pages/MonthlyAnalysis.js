import { myAxiosAws } from '../services/helperAws';
import { useState } from "react";
import { BarGraph } from '../utilities/BarGraph';
import { Loading } from '../utilities/Loading';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { SidebarHome } from '../HomePageComponents/SidebarHome';

export const MonthlyAnalysis = () => {
    const [data, setData] = useState([]);
    const [startyear, setStartYear] = useState('');
    const [startmonth, setStartMonth] = useState('');
    const [endyear, setEndYear] = useState('');
    const [endmonth, setEndMonth] = useState('');
    const [submitState, setSubmitState] = useState(false);
    const [submitState2, setSubmitState2] = useState(false);
    async function fetchData(year, month) {
        myAxiosAws.post("/configure", {
            accessKey: localStorage.awsAccessKey,
            secretKey: localStorage.awsSecretKey,
            region: "eu-north-1"
        }).then((response) => response.data).then((response) => console.log(response));

        if (month === 0) {
            year = year - 1;
            month = 12;
        }
        const date = new Date(year, month - 1);
        const dateString = date.toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' });
        try {

            const startResponse = await myAxiosAws.get("/service-costs", { params: { year: year, month: month } });
            console.log(startResponse);
            const totalcost = startResponse.data["Total Cost"]["Total Cost"];
            setData(prevData => {
                const newData = [...prevData, { date: dateString, cost: totalcost }];
                return newData;
            });

        } catch (error) {
            setData(prevData => {
                const newData = [...prevData, { date: dateString, cost: 0 }];
                return newData;
            })
            console.log(error);
        }
    }
    function HandleSubmit(event) {
        event.preventDefault();
        const diffInYears = endyear - startyear;
        console.log(diffInYears);
        if (diffInYears === 0) {
            for (let month = startmonth; month <= endmonth; month++) {
                fetchData(parseInt(startyear) + parseInt(month / 12), month % 12);
            }

        }
        else {
            const diffInMonths = Math.min(0, endmonth - startmonth);
            console.log(parseInt(startmonth) + diffInMonths + diffInYears * 12);
            for (let month = startmonth; month <= parseInt(startmonth) + diffInMonths + diffInYears * 12; month++) {
                console.log(month + " ")
                fetchData(parseInt(startyear) + parseInt(month / 12), (month % 12));
            }
        }
        setEndYear('');
        setEndMonth('');
        setStartYear('');
        setStartMonth('');
        setData([]);
        setSubmitState(!submitState);

    }
    function HandleSubmit2(event) {
        event.preventDefault();
        const diffInYears = endyear - startyear;
        if (diffInYears === 0) {
            for (let month = startmonth; month <= endmonth; month++) {
                fetchData(parseInt(startyear) + parseInt(month / 12), month % 12);
            }
        }
        else {
            const diffInMonths = Math.min(0, endmonth - startmonth);
            console.log(parseInt(startmonth) + diffInMonths + diffInYears * 12);
            for (let month = startmonth; month <= parseInt(startmonth) + diffInMonths + diffInYears * 12; month++) {
                fetchData(parseInt(startyear) + parseInt(month / 12), (month % 12));
            }
        }
        setEndYear('');
        setEndMonth('');
        setStartYear('');
        setStartMonth('');
        setData([]);
        setSubmitState2(!submitState2);
    }

    console.log(data);
    return (
        <div>

            {data.length > 0 ? (
                <div className="monthly-analysis">
                    <h3>View </h3>
                    <SidebarHome />

                    <div className='monthly-analysis__graph'>
                        {submitState ? (
                            <div>
                                <BarGraph data={data} />
                                <form onSubmit={HandleSubmit2} className="monthly-analysis_form--after-submit">
                                    <div>

                                        <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter start month" value={startmonth} required onChange={(e) => setStartMonth(e.target.value)} />
                                        <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter start year" value={startyear} required onChange={(e) => setStartYear(e.target.value)} />
                                    </div>

                                    <div>
                                        <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter end month" value={endmonth} required onChange={(e) => setEndMonth(e.target.value)} />
                                        <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter end year" value={endyear} required onChange={(e) => setEndYear(e.target.value)} />
                                    </div>

                                    {/* <button type="submit">Submit</button> */}
                                    <Button variant="contained" endIcon={<SendIcon />} type="submit">
                                        Send
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <Loading />
                        )}

                    </div>
                </div>
            ) : (

                < div className='monthly-analysis'>
                    <SidebarHome />
                    {!submitState2 && !submitState ? (

                        <form onSubmit={HandleSubmit} className="monthly-analysis_form--before-submit">
                            <div className='form_start-year'>

                                <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter start month" required value={startmonth} onChange={(e) => setStartMonth(e.target.value)} />
                                <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter start year" required value={startyear} onChange={(e) => setStartYear(e.target.value)} />
                            </div>

                            <div className='form_end-year'>
                                <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter end month" required value={endmonth} onChange={(e) => setEndMonth(e.target.value)} />
                                <TextField id="outlined-basic" variant="outlined" type="number" placeholder="Enter end year" required value={endyear} onChange={(e) => setEndYear(e.target.value)} />
                            </div>

                            {/* <button type="submit">Submit</button> */}
                            <Button variant="contained" endIcon={<SendIcon />} type="submit">
                                Check
                            </Button>
                        </form>
                    ) : (
                        <Loading />

                    )}

                </div>

            )
            }

        </div >
    )
}