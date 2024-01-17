import { Pagination } from "./components";
export default function Home() {
  return <Pagination itemCount={100} pageSize={10} currentPage={2} />;
}
