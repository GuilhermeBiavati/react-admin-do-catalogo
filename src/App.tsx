import "./App.css";
import {Box, ThemeProvider} from "@mui/system";
import {Header} from "./components/Header";
import {Layout} from "./components/Layout";
import {appTheme} from "./config/theme";
import {Route, Routes} from "react-router-dom";
import {ListCategory} from "./features/categories/ListCategory";
import {CreateCategory} from "./features/categories/CreateCategory";
import {EditCategory} from "./features/categories/EditCategory";
import {Typography} from "@mui/material";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}>
                <Box
                    component={"main"}
                    sx={{
                        height: "100vh",
                        backgroundColor: (theme) => theme.palette.grey[900]
                    }}
                >
                    <Header></Header>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<ListCategory/>}></Route>
                            <Route path="/categories" element={<ListCategory/>}></Route>
                            <Route path="/categories/create" element={<CreateCategory/>}></Route>
                            <Route path="/categories/edit/:id" element={<EditCategory/>}></Route>
                            <Route path="*" element={
                                <Box>
                                    <Typography variant="h1">404</Typography>
                                    <Typography variant="h2">Page not found</Typography>
                                </Box>
                            }></Route>
                        </Routes>
                    </Layout>
                </Box>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
