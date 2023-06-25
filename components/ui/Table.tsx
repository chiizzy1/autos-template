"use client"

import { FC } from 'react';
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid'


const columnsDraft: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'Customer Name',
    width: 200,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName} </strong>
      )
    },
  },
  { field: 'col2', headerName: 'vehicle info', width: 200 },
  { field: 'col3', headerName: 'Vehicle Diagnosis', width: 200 },
  { field: 'col4', headerName: 'Repair Cost', width: 200 },
  // { field: 'col5', headerName: 'Status', width: 200 },
  { field: 'col5', headerName: 'Check-In date', width: 200 },
  { field: 'col6', headerName: 'Check-Out date', width: 200 },
]

const columns = columnsDraft.map((col) => {
  if (col.field === 'col1') {
    return col
  }

  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      )
    },
  }
})

interface TableProps {
  info: carInfo[]
}

export interface carInfo{
  id: number,
    carId: number,
    description: string,
    estimatedCost: number,
    status: string
}

const Table: FC<TableProps> = ({info}) => {

  const rows = info.map(item => ({
    id: item.id,
    col1: item.description,
    col2: item.carId,
    col3: item.description,
    col4: `$${item.estimatedCost}`,
    // col5: item.status,
    col5: item.id,
    col6: item.id,
  }))

  return (
    <DataGrid
        style={{
          backgroundColor: 'white',
          fontSize: '.8rem',
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
  )
}

export default Table