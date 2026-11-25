import { Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecipesList from "./pages/RecipesList";
import RecipeDetails from "./pages/RecipeDetails";
import LoginLayout from "./pages/login/LoginLayout";
import ControlledLogin from "./pages/login/ControlledLogin";
import UncontrolledLogin from "./pages/login/UncontrolledLogin";
import RhfLogin from "./pages/login/RhfLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<RecipesList />} />
        <Route path="recipes/:id" element={<RecipeDetails />} />

        {/* ניתובים מקוננים: /login/controlled, /login/uncontrolled, /login/rhf */}
        <Route path="login" element={<LoginLayout />}>
          <Route index element={<Navigate to="uncontrolled" replace />} />
          <Route path="controlled" element={<ControlledLogin />} />
          <Route path="uncontrolled" element={<UncontrolledLogin />} />
          <Route path="rhf" element={<RhfLogin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
