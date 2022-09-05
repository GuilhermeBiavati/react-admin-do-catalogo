import { Box, Button, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCategories,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from './categorySlice';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { CategoryTable } from './components/CategoryTable';

export const ListCategory = () => {
  const [rowsPerPage] = useState([10, 25, 50, 100]);
  const [perPage] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isFetching, error } = useGetCategoriesQuery();

  const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();

  const categories = useAppSelector(selectCategories);

  const dispatch = useAppDispatch();

  function hadleOnPageChange(page: number) {}

  function hadleOnPageSizeChange(perPage: number) {}

  function handleFilterChange(filterModel: GridFilterModel) {}

  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryState.isSuccess) {
      enqueueSnackbar('Category deleted!', { variant: 'success' });
    }

    if (deleteCategoryState.error) {
      enqueueSnackbar('Category not deleted!', { variant: 'error' });
    }
  }, [deleteCategoryState, enqueueSnackbar]);

  return (
    <Box maxWidth={'lg'} sx={{ mt: 4, mb: 4 }}>
      <Box display={'flex'} justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: '1rem' }}
        >
          New Category
        </Button>
      </Box>
      <CategoryTable
        data={data}
        isFetching={isFetching}
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDelete}
        handleOnPageChange={hadleOnPageChange}
        handleOnPageSizeChange={hadleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
