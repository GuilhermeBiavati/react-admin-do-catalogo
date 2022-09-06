import { Box, IconButton, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Results } from '../../../types/Category';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

export function CategoryTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {
        debounceMs: 500,
      },
    },
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'isActive',
      headerName: 'Description',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.is_active,
      createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
    }));
  }

  function renderNameCell(params: GridRenderCellParams) {
    return (
      <Link to={`/categories/edit/${params.id}`}>
        <Typography color={'primary'}>{params.value}</Typography>
      </Link>
    );
  }

  function renderActionsCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(rowData.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? 'primary' : 'secondary'}>
        {row.value ? 'Active' : 'Inactive'}
      </Typography>
    );
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

  const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{ display: 'flex', height: 600 }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        rowsPerPageOptions={rowsPerPage}
        components={{
          Toolbar: GridToolbar,
        }}
        pageSize={perPage}
        disableColumnSelector={true}
        disableColumnFilter={true}
        disableDensitySelector={true}
        checkboxSelection={false}
        componentsProps={componentsProps}
        filterMode="server"
        paginationMode="server"
        loading={isFetching}
        rowCount={rowCount}
        onPageChange={handleOnPageChange}
        onPageSizeChange={handleOnPageSizeChange}
        onFilterModelChange={handleFilterChange}
      />
    </Box>
  );
}
