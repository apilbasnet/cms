import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

import { useGetCourses } from "@/lib/customHooks/getCourses";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const semesterId = [
  {
    label: "Semester 1",
    value: "Semester 1",
  },
  {
    label: "Semester 2",
    value: "Semester 2",
  },
  {
    label: "Semester 3",
    value: "Semester 3",
  },
  {
    label: "Semester 4",
    value: "Semester 4",
  },
  {
    label: "Semester 5",
    value: "Semester 5",
  },
  {
    label: "Semester 6",
    value: "Semester 6",
  },
  {
    label: "Semester 7",
    value: "Semester 7",
  },
  {
    label: "Semester 8",
    value: "Semester 8",
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
