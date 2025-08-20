import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PetList from "./PetList";
import PetOverView from "./PetOverView.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PetList />} />
                <Route path="/pet/:id" element={<PetOverView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
