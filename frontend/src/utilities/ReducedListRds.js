import React, { useState } from 'react';
import { Slider, Typography, ListItemText } from '@material-ui/core';
import { myAxiosDs } from '../services/helperDs';
import { Discuss } from 'react-loader-spinner';
import { useEffect } from 'react';

export const ReducedListRds = (props) => {
    const data = props.data;
    const jsonData = props.data;
    const [instanceData, setInstanceData] = useState(jsonData);

    const [OriginalData, setOriginalData] = useState([]);

    useEffect(() => {
        const copiedData = JSON.parse(JSON.stringify(data));
        setOriginalData(copiedData);
    }, [data]);



    const handleVcpuChange = (event, value, index) => {
        setInstanceData(prevData => {
            const newData = [...prevData];
            newData[index].vcpu = value;
            return newData;
        });
    };

    const handleMemoryChange = (event, value, index) => {
        setInstanceData(prevData => {
            const newData = [...prevData];
            newData[index].ramInGb = value;
            return newData;
        });
    };

    const stringifyData = JSON.stringify(instanceData);
    const stringifyOriginalData=JSON.stringify(OriginalData);
    async function HandleOptimize() {
        setOptimizedData("loading");
        const response = await myAxiosDs.post("/chat", {
            role: "AWS_rds",
            message: stringifyOriginalData+ '+'+ stringifyData
        }).then((response) => response.data).then((response) => {
            setOptimizedData(response.text);
            console.log(response);
        });

        console.log(response);
    }



    const [optimizedData, setOptimizedData] = useState("");

    console.log(instanceData);

    return (
        <div>
            <div>
                {instanceData.map((item, index) => (
                    <div key={item.dbInstanceID
                    } >
                        <ListItemText
                            primary={`Instance ID: ${item.dbInstanceID
                                }`}
                            secondary={`Instance Class: ${item.instanceClass}`}
                        />
                        <div>
                            <Typography >vCPU:</Typography>
                            <Slider
                                value={item.vcpu}
                                min={1}
                                max={97}
                                onChange={(event, value) => handleVcpuChange(event, value, index)}
                                valueLabelDisplay="auto"
                                aria-labelledby="vcpu-slider"

                            />
                            <Typography >Memory:</Typography>
                            <Slider
                                value={item.ramInGb}
                                min={1}
                                max={385}
                                onChange={(event, value) => handleMemoryChange(event, value, index)}
                                valueLabelDisplay="auto"
                                aria-labelledby="memory-slider"

                            />
                        </div>
                    </div>
                ))}
            </div>

            <button className="green focus dark" style={{ marginTop: "60px", marginLeft: "0", height: "50px", width: "100px" }} onClick={HandleOptimize}>Reduce</button>
            {optimizedData === null ? (
                <div>

                </div>
            ) : (
                <div>
                    {optimizedData === "loading" ? (
                        <div>
                            <Discuss />
                        </div>
                    ) : (
                        <div className="optimizedData">{optimizedData}</div>
                    )}
                </div>
            )}
        </div>
    );
};


