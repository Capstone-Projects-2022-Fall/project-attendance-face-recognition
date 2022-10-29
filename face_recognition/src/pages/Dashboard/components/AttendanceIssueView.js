import React, {Fragment} from 'react';
import DataTable from 'react-data-table-component';

export default function AttendanceIssueView(props){
    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
    };
    return(
        <DataTable
            columns={props.columns}
            data={props.data}
            pagination
            selectableRows
            onSelectedRowsChange={handleChange}
        />
    )
}