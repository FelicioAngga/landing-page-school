import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./features/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./features/landing-page";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
