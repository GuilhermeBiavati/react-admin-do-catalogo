import { Box, Button, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery } from './categorySlice'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export const ListCategory = () => {

    const { data, isFetching, error } = useGetCategoriesQuery();

    const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();

    const categories = useAppSelector(selectCategories);

    const dispatch = useAppDispatch();


    const { enqueueSnackbar } = useSnackbar();

    async function handleDelete(id: string) {
        await deleteCategory({ id });
    }


    useEffect(() => {
        if (deleteCategoryState.isSuccess) {
            enqueueSnackbar("Category deleted!", { variant: "success" });
        }

        if (deleteCategoryState.error) {
            enqueueSnackbar("Category not deleted!", { variant: "error" });
        }

    }, [deleteCategoryState, enqueueSnackbar]);




    return (
        <Box maxWidth={"lg"} sx={{ mt: 4, mb: 4 }}>
            <Box display={"flex"} justifyContent="flex-end">
                <Button variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>
            <Box sx={{ display: "flex", height: 300 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}

                />
            </Box>
        </Box>
    );


}
