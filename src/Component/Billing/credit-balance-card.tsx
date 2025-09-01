import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import type { CreditBalance } from "@/types/dashboard"

interface CreditBalanceCardProps {
  balance: CreditBalance
}

export function CreditBalanceCard({ balance }: CreditBalanceCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm text-white/70">Credit Balance</h3>
        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold mb-2">
          {balance.currency}
          {balance.amount.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+2.5% from last month</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-white/70">NEWEST</div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
            <div
            style={{ backgroundImage: 'url("/images/domain.png")' }}
             className="w-3 h-3   rounded"></div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{balance.billAndTaxes.description}</div>
            <div className="text-xs text-white/70">{balance.billAndTaxes.date}</div>
          </div>
          <div className="text-sm font-medium">
            {balance.currency}
            {balance.billAndTaxes.amount}
          </div>
        </div>
      </div>
    </Card>
  )
}
