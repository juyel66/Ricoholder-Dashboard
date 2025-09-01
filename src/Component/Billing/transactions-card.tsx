import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import type { Transaction } from "@/types/dashboard"

interface TransactionsCardProps {
  transactions: Transaction[]
}

export function TransactionsCard({ transactions }: TransactionsCardProps) {
  const getCompanyIcon = (company: string) => {
    const colors = {
      Netflix: "bg-red-500",
      Apple: "bg-gray-500",
      Stripe: "bg-purple-500",
      HubSpot: "bg-orange-500",
      Webflow: "bg-blue-500",
      Microsoft: "bg-blue-600",
    }
    return colors[company as keyof typeof colors] || "bg-gray-500"
  }

  const formatAmount = (amount: number, type: "income" | "expense") => {
    const sign = type === "income" ? "+" : "-"
    return `${sign}$${Math.abs(amount)}`
  }

  const getAmountColor = (type: "income" | "expense") => {
    return type === "income" ? "text-green-400" : "text-red-400"
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Your Transactions</h3>
        <div className="text-sm text-white/70">23 - 30 March 2020</div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-sm text-white/70 mb-3">NEWEST</div>
          <div className="space-y-3">
            {transactions.slice(0, 2).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${getCompanyIcon(transaction.company)} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {transaction.company.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.company}</div>
                    <div className="text-sm text-white/70">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-medium ${getAmountColor(transaction.type)}`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-white/70 mb-3">YESTERDAY</div>
          <div className="space-y-3">
            {transactions.slice(2).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${getCompanyIcon(transaction.company)} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {transaction.company.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.company}</div>
                    <div className="text-sm text-white/70">{transaction.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {transaction.status === "pending" ? (
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      Pending
                    </Badge>
                  ) : (
                    <div className={`font-medium ${getAmountColor(transaction.type)}`}>
                      {formatAmount(transaction.amount, transaction.type)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
