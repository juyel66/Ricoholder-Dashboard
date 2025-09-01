import type { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";

export type Payment = {
  COMPANIES: string;
  BUDGET: string;
  STATUS: string;
  COMPLETION: string; // যেমন "60%"
  avatar: string;
};

export const AuthorColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "COMPANIES",
    header: "COMPANIES",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.avatar || "https://i.ibb.co/0p9gCdVQ/155250069.jpg"}
          alt={row.original.COMPANIES}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span>{row.original.COMPANIES}</span>
      </div>
    ),
  },
  {
    accessorKey: "BUDGET",
    header: "BUDGET",
  },
  {
    accessorKey: "STATUS",
    header: "STATUS",
  },
  {
    accessorKey: "COMPLETION",
    header: "COMPLETION",
    cell: ({ row }) => {
      const stringValue = row.original.COMPLETION || "0";
      const value = parseInt(stringValue.replace("%", ""), 10);

      return (
        <div className="flex flex-col gap-1 w-40">
          {/* Progress bar */}
          <Progress
            value={value}
            className="h-2 bg-[#2D2E5F] [&>div]:bg-[#0075FF]" 
          />
          <span className="text-xs text-gray-300">{value}%</span>
        </div>
      );
    },
  },
];
