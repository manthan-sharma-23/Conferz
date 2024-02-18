import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Singout from "./pages/auth/Singout";
import AuthLayout from "./components/layouts/AuthLayout";
import RenderLayout from "./components/layouts/RenderLayout";
import AppLayout from "./components/layouts/AppLayout";

function App() {
  return (
    <div className="min-h-screen w-screen text-black">
      <RecoilRoot>
        <RenderLayout>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="/auth/signin" element={<Signin />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/signout" element={<Singout />} />
              </Route>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RenderLayout>
      </RecoilRoot>
    </div>
  );
}

export default App;
