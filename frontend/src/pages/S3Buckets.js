import { useEffect, useState } from "react"
import { myAxiosAws } from '../services/helperAws';
import { TableInstances } from "../utilities/TableInstances";
import { Loading } from '../utilities/Loading'
export const S3Buckets = () => {
    const [Data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await myAxiosAws.get("/s3/buckets-details").then((response) => response.data).then((response) => {
                    setData(response);
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }

        }

        fetchData();
    }, [])
    const tableInstance = TableInstances(Data);
    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, prepareRow, canNextPage, canPreviousPage, pageOptions, state, gotoPage, pageCount, setPageSize } = tableInstance;
    return (
        <div className="s3-buckets">
            {Data.length > 0 ? (<div >
                <table  {...getTableProps()} className="table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th  {...column.getHeaderProps(column.getSortByToggleProps())} className="table-header">
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
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
                                <tr {...row.getRowProps()} className="table-row">
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()} className="table-cell">{cell.render("Cell")}</td>;
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
                <div>

                    <button className="green focus dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'} </button>
                    <button className="green focus dark" onClick={() => previousPage()} disabled={!canPreviousPage}>PreviousPage</button>
                    <button className="green focus dark" onClick={() => nextPage()} disabled={!canNextPage}>NextPage</button>
                    <button className="green focus dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                    <strong style={{marginLeft:'20px'}}> go to page:</strong>
                    <input
                        type="number"
                        defaultValue={state.pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />



                </div>

            </div >) : (<Loading />)}

        </div>
    )
}