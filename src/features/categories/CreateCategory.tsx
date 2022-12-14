import React, {useState} from 'react'
import {Category, createCategory, updateCategory} from "./categorySlice";
import {Box, Paper, Typography} from "@mui/material";
import {CategoryForm} from "./components/CategoryForm";
import {useAppDispatch} from "../../app/hooks";
import {useSnackbar} from "notistack";

export const CreateCategory = () => {

    const [isdisabled, setIsdisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>({
        created_at: "",
        deleted_at: null,
        description: "",
        id: "",
        is_active: false,
        name: "",
        updated_at: ""

    });
    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar();


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(createCategory(categoryState));
        enqueueSnackbar("Success updating category!", {variant: "success"});
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoryState({...categoryState, [name]: value});
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCategoryState({...categoryState, [name]: checked});
    };


    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant={"h4"}>
                            Create Category
                        </Typography>
                    </Box>
                    <CategoryForm
                        category={categoryState}
                        isdisabled={isdisabled}
                        isLoading={false}
                        onSubmit={handleSubmit}
                        handleToggle={handleToggle}
                        handleChange={handleChange}/>
                </Box>
            </Paper>
        </Box>
    )
}
