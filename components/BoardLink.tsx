import Link from "next/link";

export default function BoardLink({
  isActive,
  children,
  href,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={`/dashboard/boards/${href}`}
      className={`sidebar-link h-[40px] pl-14 text-body-l ${
        isActive ? "sidebar-link-active" : "sidebar-link-inactive"
      }`}
      onClick={onClick}
    >
      {/*<BoardIcon width="12" height="12" />*/}
      {children}
    </Link>
  );
}
