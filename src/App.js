import Page from "./components/Page";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Questions from "./components/Questions";
import Results from "./components/Results";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Page />,
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
