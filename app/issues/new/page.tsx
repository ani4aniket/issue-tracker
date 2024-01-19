import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "Issue Tracker - Create new Issue",
  description: "Create new issue",
};

export default NewIssuePage;
