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
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState([10, 25, 50, 100]);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const options = { perPage, search, page };

    const { data, isFetching, error } = useGetCategoriesQuery(options);

    const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();


    function hadleOnPageChange(page: number) {
        setPage(page + 1);
    }

    function hadleOnPageSizeChange(perPage: number) {
        setPerPage(perPage);
    }

    function handleFilterChange(filterModel: GridFilterModel) {

        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            setSearch(search);
        }

        return setSearch("");
    }

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
