import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import CMSsignin from "./pages/CMSsignin";
import CMSdashboard from "./pages/CMSdashboard";
import CMSLayout from "./layouts/CMSLayout";
import CMScars from "./pages/CMScars";
import CMSadd from "./pages/CMSadd";
import CMSedit from "./pages/CMSedit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="cmssignin" element={<CMSsignin />} />
      <Route path="/" element={<CMSLayout />}>
        <Route index element={<CMSdashboard />} />
        <Route path="dashboard" element={<CMSdashboard />} />
        <Route path="cars" element={<CMScars />} />
        <Route path="cars/add" element={<CMSadd />} />
        <Route path="cars/edit/:id" element={<CMSedit />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div style={{ background: "#F4F5F7" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
