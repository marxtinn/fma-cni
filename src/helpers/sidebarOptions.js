import {
  HomeIcon,
  UserGroupIcon,
  MapPinIcon,
  UserIcon,
  ChartBarIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";

export const sidebarOptions = [
  { label: "Home", icon: HomeIcon, url: "/dashboard" },
  {
    label: "Checkpoints",
    icon: ArrowsPointingInIcon,
    url: "/dashboard/checkpoints",
  },
  { label: "Locations", icon: MapPinIcon, url: "/dashboard/locations" },
  { label: "Positions", icon: UserIcon, url: "/dashboard/positions" },
  { label: "Report", icon: ChartBarIcon, url: "/dashboard/reports" },
  { label: "Users", icon: UserGroupIcon, url: "/dashboard/users" },
];
