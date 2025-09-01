import React from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"



async function getData(): Promise<Payment[]> {
  return [
  {
    "id": "1a2b3c",
    "AUTHOR": "John Doe",
    "FUNCTION": "Manager",
    "STATUS": "ONLINE",
    "EMPLOYED": "01/01/2023",
    "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "john@example.com"
  },
  {
    "id": "2b3c4d",
    "AUTHOR": "Alice Smith",
    "FUNCTION": "Programmer",
    "STATUS": "OFFLINE",
    "EMPLOYED": "02/01/2023",
   "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "alice@example.com",
    "avatar": "https://i.ibb.co.com/84619whD/download.png",
  },
  {
    "id": "3c4d5e",
    "AUTHOR": "Bob Johnson",
    "FUNCTION": "Designer",
    "STATUS": "ONLINE",
    "EMPLOYED": "03/01/2023",
    "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "bob@example.com"
  },
  {
    "id": "4d5e6f",
    "AUTHOR": "Carol White",
    "FUNCTION": "Analyst",
    "STATUS": "OFFLINE",
    "EMPLOYED": "04/01/2023",
    "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "carol@example.com",
    "avatar": "https://i.ibb.co.com/HLKr4ZFR/First-Card.png"
  },
  {
    "id": "5e6f7g",
    "AUTHOR": "David Brown",
    "FUNCTION": "Tester",
    "STATUS": "ONLINE",
    "EMPLOYED": "05/01/2023",
   "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "david@example.com",

  },
  {
    "id": "6f7g8h",
    "AUTHOR": "Eva Green",
    "FUNCTION": "HR",
    "STATUS": "OFFLINE",
    "EMPLOYED": "06/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "eva@example.com",
     "avatar": "https://i.ibb.co.com/fV654t0N/women1.jpg"
  },
  {
    "id": "7g8h9i",
    "AUTHOR": "Frank Black",
    "FUNCTION": "Support",
    "STATUS": "ONLINE",
    "EMPLOYED": "07/01/2023",
  "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "frank@example.com"
  },
  {
    "id": "8h9i0j",
    "AUTHOR": "Grace King",
    "FUNCTION": "Consultant",
    "STATUS": "OFFLINE",
    "EMPLOYED": "08/01/2023",
   "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "grace@example.com"
  },
  {
    "id": "9i0j1k",
    "AUTHOR": "Henry Lee",
    "FUNCTION": "Intern",
    "STATUS": "ONLINE",
    "EMPLOYED": "09/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "henry@example.com"
  },
  {
    "id": "0j1k2l",
    "AUTHOR": "Ivy Scott",
    "FUNCTION": "Engineer",
    "STATUS": "OFFLINE",
    "EMPLOYED": "10/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "ivy@example.com"
  },
  {
    "id": "1k2l3m",
    "AUTHOR": "Jack Hill",
    "FUNCTION": "Coordinator",
    "STATUS": "ONLINE",
    "EMPLOYED": "11/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "jack@example.com"
  },
  {
    "id": "2l3m4n",
    "AUTHOR": "Karen Young",
    "FUNCTION": "Director",
    "STATUS": "OFFLINE",
    "EMPLOYED": "12/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "karen@example.com"
  },
  {
    "id": "3m4n5o",
    "AUTHOR": "Leo Adams",
    "FUNCTION": "Lead",
    "STATUS": "ONLINE",
    "EMPLOYED": "13/01/2023",
    "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "leo@example.com"
  },
  {
    "id": "4n5o6p",
    "AUTHOR": "Mia Clark",
    "FUNCTION": "Designer",
    "STATUS": "OFFLINE",
    "EMPLOYED": "14/01/2023",
  "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "mia@example.com"
  },
  {
    "id": "5o6p7q",
    "AUTHOR": "Nathan Hall",
    "FUNCTION": "Programmer",
    "STATUS": "ONLINE",
    "EMPLOYED": "15/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "nathan@example.com"
  },
  {
    "id": "6p7q8r",
    "AUTHOR": "Olivia Allen",
    "FUNCTION": "Manager",
    "STATUS": "OFFLINE",
    "EMPLOYED": "16/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "olivia@example.com"
  },
  {
    "id": "7q8r9s",
    "AUTHOR": "Peter Wright",
    "FUNCTION": "Tester",
    "STATUS": "ONLINE",
    "EMPLOYED": "17/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "peter@example.com"
  },
  {
    "id": "8r9s0t",
    "AUTHOR": "Quinn Baker",
    "FUNCTION": "Consultant",
    "STATUS": "OFFLINE",
    "EMPLOYED": "18/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "quinn@example.com"
  },
  {
    "id": "9s0t1u",
    "AUTHOR": "Rachel Turner",
    "FUNCTION": "HR",
    "STATUS": "ONLINE",
    "EMPLOYED": "19/01/2023",
 "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "rachel@example.com"
  },
  {
    "id": "0t1u2v",
    "AUTHOR": "Sam Parker",
    "FUNCTION": "Engineer",
    "STATUS": "OFFLINE",
    "EMPLOYED": "20/01/2023",
    "ACTION": "https://i.ibb.co.com/BHQ22TSp/delete.png",
    "email": "sam@example.com",
    

  }
]



}


const TablesAuthor: React.FC = () => {
  const [data, setData] = React.useState<Payment[]>([])

  React.useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <div

     style={{
          backgroundImage: "url('/images/BackgroundTable.png')",
          backgroundPosition: "top center",
          // transform: "rotate(180deg)"
        }}
    
     className="container mx-auto h-[550px] overflow-scroll py-10 rounded-xl p-2  ">
      <h1 className="text-xl   font-bold mb-5 text-white">Author Table</h1>

      <div className="text-white ">
        <DataTable columns={columns} data={data} />
      </div>
          
    </div>
  )
}

export default TablesAuthor
