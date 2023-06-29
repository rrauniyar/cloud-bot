import React, { useState } from 'react';
import { Slider, Typography, ListItemText } from '@material-ui/core';
import { myAxiosDs } from '../services/helperDs';
import { Discuss } from 'react-loader-spinner';

export const ReducedListS3 = (props) => {
    const jsonData = props.data;
    const [instanceData, setInstanceData] = useState(jsonData);

    const handleDaysChange = (event, value, index) => {
        setInstanceData(prevData => {
            const newData = [...prevData];
            newData[index].objectDetailsList[0]["numberOfDaysSinceLastAccess"] = value;
            return newData;
        });
    };



    const stringifyData = JSON.stringify(instanceData);
    async function HandleOptimize() {
        setOptimizedData("loading");
        const response = await myAxiosDs.post("/chat", {
            role: "AWS_instance",
            message: stringifyData
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
                    
                    <div key={item.bucketName} >
                        <ListItemText primary={index+1} />
                        <ListItemText
                            primary={`Bucket Name: ${item.bucketName}`}
                            secondary={`Storage Class: ${item.storageClass}`}
                        />
                        <div>
                            <Typography >Days Since Last access:</Typography>
                            <Slider
                                value={item.objectDetailsList[0]["numberOfDaysSinceLastAccess"]}
                                min={1}
                                max={450}
                                onChange={(event, value) => handleDaysChange(event, value, index)}
                                valueLabelDisplay="auto"
                                aria-labelledby="vcpu-slider"

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
