import * as React from "react";

export default function usePagination(rows) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return { emptyRows, setPage, setRowsPerPage, rowsPerPage, page }
}
