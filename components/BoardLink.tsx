import Link from "next/link";

export default function BoardLink({
  isActive,
  children,
  href,
}: {
  isActive: boolean;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={`/dashboard/boards/${href}`}
      className={`sidebar-link h-[40px] pl-10 text-body-l ${
        isActive ? "sidebar-link-active" : "sidebar-link-inactive"
      }`}
    >
      {/*<BoardIcon width="12" height="12" />*/}
      {children}
    </Link>
  );
}
