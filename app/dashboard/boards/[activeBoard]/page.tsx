import Columns from "../_components/Columns";
import { CreateNewColumn } from "../_components/CreateNewColumn";

export default function Dashboard() {
  return (
    <div className="flex h-full gap-[24px] p-[24px]">
      <Columns />
      <CreateNewColumn />
    </div>
  );
}
