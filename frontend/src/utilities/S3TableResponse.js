import { TableInstances } from "./TableInstances";
export const S3TableResponse = (props) => {
    const data = props.data;
    if (data === null) {
        return (
            <div>
            </div>
        )
    }
    const tableInstance = TableInstances(data);
    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, prepareRow, canNextPage, canPreviousPage, pageOptions, state, gotoPage, pageCount, setPageSize } = tableInstance;
    return (
        <div>
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
                <div className="button-group">

                    <button className="green focus dark" style={{ margin: "0" }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'} </button>
                    <button className="green focus dark" style={{ margin: "0" }} onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}  </button>
                    <button className="green focus dark" style={{ margin: "0" }} onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                    <button className="green focus dark" style={{ margin: "0" }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                    <div style={{ marginTop: '10px' }}><strong style={{ marginLeft: '20px' }}> go to page:</strong></div>
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
            </div>
        </div>
    )
}