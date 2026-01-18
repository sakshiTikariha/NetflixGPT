
import { createBrowserRouter } from "react-router-dom";
import Browser from "./Browser";
import Login from "./login";
import { RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browser",
      element: <Browser />,
    },
  ]);

  return (
    <div className="body overflow-x-hidden overflow-y-hidden">
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;