import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Books } from "./pages/Books";
import { Playlist } from "./pages/Playlist";
import { Profile } from "./pages/Profile";
import { Recommondations } from "./pages/Recommendations";
import { CssBaseline } from "@mui/material";
import { BookData } from "./pages/BookData";

const App = () => {
  return (
    <Layout>
       <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mybooklist" element={<Playlist />} />
        <Route path="/recommendations" element={<Recommondations />} />
        <Route path="/bookdata/:id" element={<BookData />}/>
        <Route
        path="*"
        element={<Navigate to="/404" replace />}
    />
      </Routes>
    </Layout>
  );
}

export default App;
