import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Questions from "./components/Questions";
import Results from "./components/Results";
import CustomForm from "./components/CustomForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: "quiz",
      element: <Questions />,
    },
    {
      path: "results",
      element: <Results />,
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
