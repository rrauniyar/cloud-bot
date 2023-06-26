
import * as React from "react";
import { Loading } from '../utilities/Loading';
import { TableInstances } from "../utilities/TableInstances";
import PieChart from "../utilities/PieChart"
import { myAxiosAws } from "../services/helperAws";
import { useState, useEffect } from "react";
import { SidebarHome } from "../HomePageComponents/SidebarHome";

export const Bill = (props) => {

    const [Data, setData] = useState([]);


    Data.sort((a, b) => b.cost_per_month - a.cost_per_month);


    useEffect(() => {
        myAxiosAws.post("/configure", {
            accessKey: localStorage.awsAccessKey,
            secretKey: localStorage.awsSecretKey,
            region: "eu-north-1"
        }).then((response) => response.data).then((response) => console.log(response));

        const fetchData = async () => {
            try {
                const response = await myAxiosAws.get("/total-cost");
                console.log(response);
                const costdata = response.data.costDetails;
                setData(costdata);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    console.log(Data);

    const servicesArray = Data.map((obj) => obj.service_name);
    const costData = Data.map((obj) => obj.cost_per_month);
    const tableInstance = TableInstances(Data);
    const [graphFlag, setGraphFlag] = React.useState(false);
    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, prepareRow, canNextPage, canPreviousPage, pageOptions, state, gotoPage, pageCount, setPageSize } = tableInstance;
    return (
        <div>
            {Data && Data.length > 0 ? (
                <div>
                    <SidebarHome />
                    <div className='bill'>
                        {!graphFlag ? (<div className="mt-4"   >
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    {headerGroups.map((headerGroup) => (

                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? ' 🔽'
                                                                : ' 🔼'
                                                            : ''}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => {
                                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="page-selector">
                                <span>
                                    Page {' '}
                                    <strong>
                                        {state.pageIndex + 1} of {pageOptions.length}
                                    </strong>
                                </span>
                                <select value={state.pageSize} onChange={(e) => (
                                    setPageSize(e.target.value)
                                )}>{
                                        [10, 25, 40].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                show {pageSize}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>
                            <div className="pagination-buttons">

                                <button className="green focus dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'} </button>
                                <button className="green focus dark" onClick={() => previousPage()} disabled={!canPreviousPage}>PreviousPage</button>
                                <button className="green focus dark" onClick={() => nextPage()} disabled={!canNextPage}>NextPage</button>
                                <button className="green focus dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                                <div className="go-to-page">
                                    <span className="go-to-page-text">Go to page:</span>
                                    <input
                                        type="number"
                                        defaultValue={state.pageIndex + 1}
                                        className="page-input"
                                        onChange={(e) => {
                                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                            gotoPage(pageNumber);
                                        }}
                                    />
                                </div>


                                <button className="green focus dark" onClick={() => setGraphFlag(!graphFlag)}>View in PieChart</button>
                            </div>

                        </div >) : (<div className="piecharts">
                            <PieChart servicesArray={servicesArray} costData={costData} />
                            <div className="viewservices-table"><button className="green focus dark services-table-view" onClick={() => setGraphFlag(!graphFlag)}>View in Tables</button></div>
                        </div>)}
                    </div>
                </div>
            ) : (
                <Loading />
            )}



        </div>
    )
}



// 1. `React.useMemo()`: 
// It's a hook from the React library that allows us to memoize (cache) a value, so that it only gets re-computed when the dependencies have changed. In this code, `React.useMemo()` is used to memoize the `data` and `columns` variables. These variables are only computed once, when the component mounts.

// 2. `useTable()`: 
// It's a hook from the `react-table` library that initializes a table instance with columns and data, and returns functions and properties for rendering the table. 

// 3. `getTableProps()`: 
// This function is a part of the table instance returned by the `useTable()` hook. It returns an object of props that should be spread onto the `table` element in JSX. These props include `className`, `style`, `role`, `aria-labelledby`, and `aria-describedby`.

// 4. `getTableBodyProps()`: 
// This function is a part of the table instance returned by the `useTable()` hook. It returns an object of props that should be spread onto the `tbody` element in JSX. These props include `className`, `style`, `role`, `aria-labelledby`, and `aria-describedby`.

// 5. `headerGroups`: 
// This is an array of objects returned by the table instance. Each object represents a group of header columns that share the same `HeaderGroupProps`. The `headerGroups` array is mapped over to create `tr` elements for the table header.

// 6. `rows`: 
// This is an array of row objects returned by the table instance. Each row object has a `cells` array property, which represents the cells in that row. The `rows` array is mapped over to create `tr` elements for the table body.

// 7. `prepareRow()`: 
// This function is a part of the row object returned by the table instance. It prepares the row for rendering by computing its properties, such as the `rowProps` and `cells`. It should be called on each row object before rendering it.

// 8. `row.getRowProps()`: 
// This function is a part of the row object returned by the table instance. It returns an object of props that should be spread onto the `tr` element in JSX. These props include `className`, `style`, `role`, `aria-labelledby`, and `aria-describedby`.

// 9. `cell.getCellProps()`: 
// This function is a part of the cell object returned by the table instance. It returns an object of props that should be spread onto the `td` element in JSX. These props include `className`, `style`, `role`, `aria-labelledby`, and `aria-describedby`.

// 10. `column.render()`: 
// This function is a part of the column object returned by the table instance. It renders the header or cell value based on the argument passed to it. In this code, it's used to render the header text for each column.