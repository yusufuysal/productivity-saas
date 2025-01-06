import ColumnSkeleton from "./ColumnSkeleton";
import TaskSkeleton from "./TaskSkeleton";

const ColumnsSkeleton = () => (
  <div className="flex gap-[24px] h-full">
    <ColumnSkeleton>
      <>
        <TaskSkeleton width={158} />
        <TaskSkeleton width={133} />
        <TaskSkeleton width={125} />
        <TaskSkeleton width={135} />
      </>
    </ColumnSkeleton>

    <ColumnSkeleton>
      <TaskSkeleton width={158} />
    </ColumnSkeleton>

    <ColumnSkeleton>
      <>
        <TaskSkeleton width={166} />
        <TaskSkeleton width={180} />
        <TaskSkeleton width={144} />
        <TaskSkeleton width={154} />
        <TaskSkeleton width={177} />
        <TaskSkeleton width={139} />
      </>
    </ColumnSkeleton>

    <ColumnSkeleton>
      <>
        <TaskSkeleton width={159} />
        <TaskSkeleton width={148} />
        <TaskSkeleton width={178} />
      </>
    </ColumnSkeleton>

    <ColumnSkeleton>
      <>
        <TaskSkeleton width={187} />
        <TaskSkeleton width={174} />
      </>
    </ColumnSkeleton>
  </div>
);

export default ColumnsSkeleton;
