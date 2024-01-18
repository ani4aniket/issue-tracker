"use client";
import { IssueStatusBadge, Skeleton } from "@/app/components";
import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  if (!issue) return <Skeleton height={"2rem"} />;

  const assignIssue = async (status: string) => {
    await axios
      .patch("/api/issues/" + issue.id, {
        status,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });

    router.refresh();
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={assignIssue}>
        <Select.Trigger placeholder="Change status" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                <IssueStatusBadge status={status.value} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
