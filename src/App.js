import Page from "./components/Page";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Page />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <main>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </main>
  );
}

export default App;
