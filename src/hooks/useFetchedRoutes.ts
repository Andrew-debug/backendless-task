import { useState, useEffect } from "react";
interface IData {
  id: string;
  title: string;
  order: number;
  path: string;
}
const useFetchedRoutes = () => {
  const [fetchedRoutes, setFetchedRoutes] = useState<IData[] | null>(null);
  useEffect(() => {
    async function fetchRoutes() {
      try {
        const req = await fetch("./data.json");
        const result = await req.json();
        setFetchedRoutes(result.data);
      } catch (error) {
        throw error;
      }
    }
    fetchRoutes();
  }, []);
  return fetchedRoutes;
};

export default useFetchedRoutes;
