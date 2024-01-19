"use client";
import { IssueStatusBadge, Link, Skeleton } from "@/app/components";
import { Issue, Status, User } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NextLink from "next/link";
import AssigneeInfoAvatar from "./AssigneeInfoAvatar";
export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const { data: users, isLoading, error } = useUsers();

  if (error) return null;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {isLoading ? (
                <Skeleton
                  width={"1.5rem"}
                  height={"1.5rem"}
                  borderRadius={"50%"}
                />
              ) : (
                <>
                  {users?.findIndex(
                    (user) => user.id === issue.assignedToUserId
                  ) !== -1 ? (
                    <AssigneeInfoAvatar
                      imageSrc={
                        users!.find(
                          (user) => user.id === issue.assignedToUserId
                        )!.image!
                      }
                      tooltipContent={
                        users!.find(
                          (user) => user.id === issue.assignedToUserId
                        )!.name!
                      }
                    />
                  ) : null}
                </>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
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
export const columnNames = columns.map((column) => column.value);

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

export default IssueTable;
