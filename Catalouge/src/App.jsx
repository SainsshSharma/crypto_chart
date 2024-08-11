import "./App.css";
import Heading from "./Components/Heading/Heading";
import Menu from "./Components/Menu/Menu";
import Actionbar from "./Components/ActionBar/Actionbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Summary from "./Pages/Summary/Summary";
import Settings from "./Pages/Settings/Settings";
import Chart from "./Pages/Chart/Chart";
import Statistics from "./Pages/Statistics/Statistics";
import Analysis from "./Pages/Analysis/Analysis";
import { useStore } from "./Components/store/storeGraph";
import { useEffect, useState } from "react";
import { fetchDataOnDate } from "./Components/utils/utils";

function App() {
  const Layout = () => {
    const { interval } = useStore();
    const { curr } = useStore();
    const { secondCurr } = useStore();
    const [data, setData] = useState({});
    const [secondData, setSecondData] = useState({});

    useEffect(() => {
      fetchDataOnDate(interval, curr).then((data) => setData(data || {}));

      fetchDataOnDate(interval, secondCurr).then((data) =>
        setSecondData(data || {})
      );
    }, [interval, curr, secondCurr]);

    return (
      <div className="layoutContainer">
        <div className="heading">
          <Heading />
        </div>
        <div className="menu">
          <Menu />
        </div>
        <div id="fullScreen">
        <div className="actionBar">
          <Actionbar />
        </div>
        <div className="pages">
          <Outlet context={[data, secondData]} />
        </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Summary />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
        {
          path: "/statistics",
          element: <Statistics />,
        },
        {
          path: "/analysis",
          element: <Analysis />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
