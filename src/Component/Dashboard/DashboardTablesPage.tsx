import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"

const projectsData = [
  {
    id: 1,
    name: "Chakra Soft UI Version",
    members: [
      { avatar: "/diverse-person-portrait.png", name: "User 1" },
      { avatar: "/diverse-group-conversation.png", name: "User 2" },
      { avatar: "/diverse-group-meeting.png", name: "User 3" },
      { avatar: "/diverse-group-meeting.png", name: "User 4" },
    ],
    budget: "$14,000",
    completion: 60,
    icon: "🎨",
  },
  {
    id: 2,
    name: "Add Progress Track",
    members: [
      { avatar: "/diverse-group-five.png", name: "User 5" },
      { avatar: "/diverse-group-meeting.png", name: "User 6" },
    ],
    budget: "$3,000",
    completion: 10,
    icon: "📊",
  },
  {
    id: 3,
    name: "Fix Platform Errors",
    members: [
      { avatar: "/diverse-group-meeting.png", name: "User 7" },
      { avatar: "/diverse-group-meeting.png", name: "User 8" },
    ],
    budget: "Not set",
    completion: 100,
    icon: "🔧",
  },
  {
    id: 4,
    name: "Launch our Mobile App",
    members: [
      { avatar: "/diverse-group-conversation.png", name: "User 9" },
      { avatar: "/diverse-group-meeting.png", name: "User 10" },
      { avatar: "/diverse-group-eleven.png", name: "User 11" },
      { avatar: "/diverse-group-meeting.png", name: "User 12" },
    ],
    budget: "$32,000",
    completion: 100,
    icon: "📱",
  },
  {
    id: 5,
    name: "Add the New Pricing Page",
    members: [
      { avatar: "/diverse-group-meeting.png", name: "User 13" },
      { avatar: "/diverse-group-friends.png", name: "User 14" },
      { avatar: "/person15.png", name: "User 15" },
      { avatar: "/person16.png", name: "User 16" },
    ],
    budget: "$400",
    completion: 25,
    icon: "💰",
  },

]

const ordersData = [
  {
    id: 1,
    title: "$2400, Design changes",
    time: "22 DEC 7:20 PM",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "New order #4219423",
    time: "21 DEC 11:21 PM",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Server Payments for April",
    time: "21 DEC 9:28 PM",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "New card added for order #3210145",
    time: "20 DEC 3:52 PM",
    color: "bg-yellow-500",
  },
  {
    id: 5,
    title: "Unlock packages for Development",
    time: "19 DEC 11:35 PM",
    color: "bg-green-500",
  },
  {
    id: 6,
    title: "New order #9851258",
    time: "18 DEC 4:41 PM",
    color: "bg-purple-500",
  },
]

export function DashboardTablesPage() {
  return (
    <div className="grid   grid-cols-1 lg:grid-cols-3 gap-6  mx-auto">
      {/* Projects Card */}
      <Card
       style={{
    backgroundImage: "url('/images/tableBG.png')",
  }}
      
      className="lg:col-span-2 bg-no-repeat bg-cover bg-slate-800 border-slate-700 ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-white text-lg font-semibold">Projects</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-400 text-sm">30 done this month</span>
            </div>
          </div>
          <MoreHorizontal className="h-5 w-5 text-slate-400" />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 text-xs text-slate-400 uppercase tracking-wider pb-2">
            <div>Companies</div>
            <div>Members</div>
            <div>Budget</div>
            <div>Completion</div>
          </div>

          {/* Project Rows */}
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-4 gap-4 items-center py-3 border-b border-slate-700 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{project.icon}</span>
                <span className="text-white text-sm font-medium">{project.name}</span>
              </div>

              <div className="flex -space-x-2">
                {project.members.map((member, index) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-slate-800">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="bg-slate-600 text-white text-xs">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>

              <div className="text-white text-sm font-medium">{project.budget}</div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{project.completion}%</span>
                </div>
                <Progress value={project.completion} className="h-1 bg-slate-700" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Orders Overview Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-white text-lg font-semibold">Orders overview</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">+30% this month</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {ordersData.map((order) => (
            <div key={order.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${order.color}`}></div>
              <div className="flex-1 space-y-1">
                <p className="text-white text-sm font-medium">{order.title}</p>
                <p className="text-slate-400 text-xs">{order.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
