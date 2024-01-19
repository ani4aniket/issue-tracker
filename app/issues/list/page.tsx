import { Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  {
    label: "Assigned To",
    value: "assignedToUserId",
    className: "hidden md:table-cell",
  },
];
const columnNames = columns.map((column) => column.value);

// export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
