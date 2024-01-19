import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const metadata: Metadata = {
  title: "Issue Tracker - Update Issue",
  description: "Update issue",
};

export default EditIssuePage;
