import React from "react";

import { AuthorColumns, type Payment } from "./ProjectColumns";
import { DataTable } from "./data-table";
import { IoMdCheckmark } from "react-icons/io";



async function getData(): Promise<Payment[]> {
  return [
    {
      COMPANIES: "Md Juyel Rana",
      BUDGET: "$360",
      STATUS: "Working",
      COMPLETION: "10%",
      avatar: "https://i.ibb.co.com/HLKr4ZFR/First-Card.png"
    },
    {
      COMPANIES: "Md Juyel Rana",
      BUDGET: "$360",
      STATUS: "Canceled",
      COMPLETION: "60%",
      avatar: "https://i.ibb.co.com/fV654t0N/women1.jpg"
    },
    {
      COMPANIES: "Thompson",
      BUDGET: "$460",
      STATUS: "Working",
      COMPLETION: "70%",
      avatar: "https://i.ibb.co.com/fV654t0N/women1.jpg"
    },
    {
      COMPANIES: "John Due",
      BUDGET: "$560",
      STATUS: "Canceled",
      COMPLETION: "10%",
      avatar: "https://i.ibb.co.com/fV654t0N/women1.jpg"
    }
  ];
}

const TablesProjects: React.FC = () => {
  const [data, setData] = React.useState<Payment[]>([])

  React.useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <div
      style={{
        backgroundImage: "url('/images/BackgroundTable.png')",
        backgroundPosition: "top center",
      }}
      className="container mx-auto h-[550px] overflow-scroll py-10 rounded-xl p-2"
    >
      <h1 className="text-xl font-bold mb-5 text-white p-2">Project</h1>
      <div className="flex items-center gap-2 text-white">
        <div className="bg-green-600 rounded-full"><IoMdCheckmark /></div>
        <span>30 done on this month</span>
      </div>

      <div className="text-white">
        <DataTable columns={AuthorColumns} data={data} />
      </div>
    </div>
  )
}

export default TablesProjects
