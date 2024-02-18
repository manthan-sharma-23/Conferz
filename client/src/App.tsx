import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JoinRoom from "./pages/JoinRoom";
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="min-h-screen w-screen text-black">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/room/:room" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
