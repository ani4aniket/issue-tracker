"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Avatar, Responsive } from "@radix-ui/themes";
import "./styles.css";

interface Props {
  imageSrc: string;
  tooltipContent: string;
  avatarSize?: Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">;
}
const AssigneeInfoAvatar = ({
  imageSrc,
  tooltipContent,
  avatarSize,
}: Props) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Avatar
          src={imageSrc}
          fallback="?"
          size={avatarSize ?? "1"}
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="TooltipContent" sideOffset={5}>
          {tooltipContent}
          <Tooltip.Arrow className="TooltipArrow" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default AssigneeInfoAvatar;
