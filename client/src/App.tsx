import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JoinRoom from "./pages/JoinRoom";
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import { RecoilRoot } from "recoil";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Singout from "./pages/auth/Singout";
import AuthLayout from "./components/layouts/AuthLayout";
import RenderLayout from "./components/layouts/RenderLayout";

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
              <Route index element={<Home />} />
              <Route path="/join" element={<JoinRoom />} />
              <Route path="/create" element={<CreateRoom />} />
              <Route path="/room/:room" element={<Room />} />
            </Routes>
          </BrowserRouter>
        </RenderLayout>
      </RecoilRoot>
    </div>
  );
}

export default App;
