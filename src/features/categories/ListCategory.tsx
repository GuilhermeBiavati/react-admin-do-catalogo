import {Box, Button, IconButton, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery} from './categorySlice'
import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSnackbar} from "notistack";
import {useEffect} from "react";

export const ListCategory = () => {

    const {data, isFetching, error} = useGetCategoriesQuery();

    const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();

    const categories = useAppSelector(selectCategories);

    const dispatch = useAppDispatch();

    const rows: GridRowsProp = data ? data.data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString("pt-BR")
    })) : [];

    const {enqueueSnackbar} = useSnackbar();


    const columns: GridColDef[] = [
        {
            field: "name", headerName: "Name", flex: 1,
            renderCell: renderNameCell
        },
        {
            field: "description", headerName: "Description", flex: 1
        },
        {
            field: "isActive", headerName: "Description", flex: 1, type: "boolean",
            renderCell: renderIsActiveCell
        },
        {
            field: "createdAt", headerName: "Created At", flex: 1
        },
        {
            field: "id", headerName: "Actions", flex: 1, renderCell: renderActionsCell
        }
    ]

    function renderNameCell(params: GridRenderCellParams) {
        return <Link to={`/categories/edit/${params.id}`}>
            <Typography color={"primary"}>{params.value}</Typography>
        </Link>;
    }

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton color="secondary" onClick={() => handleDelete(rowData.value)} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        );
    }

    function renderIsActiveCell(row: GridRenderCellParams) {
        return <Typography color={row.value ? "primary" : "secondary"}>{row.value ? "Active" : "Inactive"}</Typography>;
    }

    async function handleDelete(id: string) {
        await deleteCategory({id});
    }

    useEffect(() => {
        if (deleteCategoryState.isSuccess) {
            enqueueSnackbar("Category deleted!", {variant: "success"});
        }

        if (deleteCategoryState.error) {
            enqueueSnackbar("Category not deleted!", {variant: "error"});
        }

    }, [deleteCategoryState, enqueueSnackbar]);


    const componentsProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
                debounceMs: 500
            }
        }
    };

    return (
        <Box maxWidth={"lg"} sx={{mt: 4, mb: 4}}>
            <Box display={"flex"} justifyContent="flex-end">
                <Button variant="contained"
                        color="secondary"
                        component={Link}
                        to="/categories/create"
                        style={{marginBottom: "1rem"}}
                >
                    New Category
                </Button>
            </Box>
            <Box sx={{display: "flex", height: 300}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
                    components={{
                        Toolbar: GridToolbar
                    }}
                    disableColumnSelector
                    disableColumnFilter
                    disableDensitySelector
                    checkboxSelection
                    componentsProps={componentsProps}
                />
            </Box>
        </Box>
    );


}
