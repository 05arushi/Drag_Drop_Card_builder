import React, { useEffect } from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from "@mui/material";
import { TableSettings } from "./TableSettings";

function Table({ rows = 3, columns = 3, fontSize = 14, headerData = [], rowData = [] }) {
    const { connectors: { connect, drag }, actions: { setProp } } = useNode();

    useEffect(() => {
        setProp((props) => {
            const oldHeader = props.headerData || [];
            const newHeader = [];

            for (let i = 0; i < columns; i++) {
                newHeader.push(oldHeader[i] ?? `Header ${i + 1}`);
            }

            props.headerData = newHeader;
        });
    }, [columns, setProp]);

    useEffect(() => {
        setProp((props) => {
            const oldRowData = props.rowData || [];
            const newRowData = [];

            for (let i = 0; i < rows; i++) {
                const oldRow = oldRowData[i] || [];
                const newRow = [];

                for (let j = 0; j < columns; j++) {
                    newRow.push(oldRow[j] ?? `Row ${i + 1} - Col ${j + 1}`);
                }

                newRowData.push(newRow);
            }

            props.rowData = newRowData;
        });
    }, [rows, columns, setProp]);


    return (
        <TableContainer ref={ref => connect(drag(ref))} component={Paper}>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        {headerData?.map((header, colIndex) => (
                            <TableCell key={colIndex}
                                sx={{ borderBottom: '2px solid black' }}>
                                <ContentEditable
                                    html={header}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
                                        setProp((props) => {
                                            props.headerData[colIndex] = value;
                                        });
                                    }}
                                    style={{ fontSize: `${fontSize}px`, fontWeight: "bold" }}
                                />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData?.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <TableCell key={colIndex}>
                                    <ContentEditable
                                        html={cell}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
                                            setProp((props) => {
                                                props.rowData[rowIndex][colIndex] = value;
                                            });
                                        }}
                                        style={{ fontSize: `${fontSize}px` }}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}

                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}

export default Table

Table.craft = {
    props: {
        rows: 3,
        columns: 3,
        fontSize: 14,
        headerData: [],
        rowData: []
    },
    displayName: "Table",
    related: {
        settings: TableSettings
    }
};