import { useCallback, useMemo } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import { useEffect, useState } from 'react';
export function TableInstancesRDS(TableData, Cpuvalue, memoryValue) {


    const [Data, setData] = useState([]);
    useEffect(() => {
        const filteredData = TableData.filter(
            item => (item.vcpu >= Cpuvalue[0] && item.vcpu <= Cpuvalue[1])

        );
        const filterAgainData = filteredData.filter(
            item => (item.ramInGb >= memoryValue[0] && item.ramInGb <= memoryValue[1])
        )
        setData(filterAgainData);
    }, [Cpuvalue, memoryValue, TableData]);

    console.log(Data);
    const objectToKeyValuePairs = useCallback((obj) => {
        if (Array.isArray(obj)) {
            return obj.flatMap((item, index) =>
                objectToKeyValuePairs(item).map(([key, value]) => [`${index}.${key}`, value])
            );
        }
        return Object.entries(obj).flatMap(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return objectToKeyValuePairs(value).map(([nestedKey, nestedValue]) => [
                    `${key}-${nestedKey}`,
                    nestedValue,
                ]);
            } else {
                return [[key, value]];
            }
        });
    }, []);

    const keyValuePairs = useMemo(() => objectToKeyValuePairs(Data), [Data, objectToKeyValuePairs]);

    const keyValueObject = useMemo(() => {
        const result = {};
        for (let i = 0; i < keyValuePairs.length; i++) {
            let [key, value] = keyValuePairs[i];
            const instanceIndex = key.match(/^(\d+)\./)?.[1]; // extract the instance index from the key
            if (instanceIndex !== undefined) {
                const instanceObj = result[instanceIndex] || {};
                const nestedKey = key.replace(`${instanceIndex}.`, ''); // remove the instance index from the key
                instanceObj[nestedKey] = value;
                result[instanceIndex] = instanceObj;
            }
        }

        return result;
    }, [keyValuePairs]);

    const data = useMemo(() => Object.entries(keyValueObject).map(([_, value]) => value), [keyValueObject]);
    const obj = useMemo(() => data ? data[0] : null, [data]);
    const keys = useMemo(() => obj ? Object.keys(obj) : null, [obj]);
    const columns = useMemo(() => {
        let columnData = [];
        if (obj) {
            for (let objKey of keys) {
                // console.log(objKey);
                if (objKey.includes(".")) {
                    continue;
                }
                let newColumnObj = {};
                newColumnObj['Header'] = objKey;
                newColumnObj['accessor'] = objKey;
                columnData.push(newColumnObj);
            }
            return columnData;
        } else {
            return [];
        }
    }, [keys, obj]);




    const tableInstance = useTable({ columns, data }, useSortBy, usePagination);
    return tableInstance;
}
