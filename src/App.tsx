import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import useFetchedRoutes from "./hooks/useFetchedRoutes";

type RouteComponent = () => Promise<{ default: React.ComponentType }>;

const componentMap: Record<string, RouteComponent> = {
  dummyTable: () => import("./components/DummyTable"),
  dummyChart: () => import("./components/DummyChart"),
  dummyList: () => import("./components/DummyList"),
};

const App = () => {
  const fetchedRoutes = useFetchedRoutes();

  const routes =
    fetchedRoutes &&
    fetchedRoutes.map((route) => {
      const Component = lazy(componentMap[route.id]);
      return {
        path: route.id,
        element: <Component />,
      };
    });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <ul className="nav">
          {fetchedRoutes &&
            fetchedRoutes.map((route) => (
              <li key={route.id}>
                <Link to={`backendless-task/${route.id}`}>{route.title}</Link>
              </li>
            ))}
        </ul>
        <Routes>
          {routes && (
            <>
              <Route
                path="/backendless-task"
                element={<Navigate to={fetchedRoutes[0].id} replace />}
              />
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={`backendless-task/${route.path}`}
                  element={route.element}
                />
              ))}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
