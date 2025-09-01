import { Card } from "@/components/ui/card"
import type { CreditCard as CreditCardType } from "@/types/dashboard"

interface CreditCardProps {
  card: CreditCardType
  className?: string
}

export function CreditCard({ card, className }: CreditCardProps) {
  return (
    <Card className={`p-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0 ${className}`}>
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-lg font-semibold">Vision UI</h3>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white/40 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xl font-mono tracking-wider">{card.number}</div>

        <div className="flex justify-between text-sm">
          <div>
            <div className="text-white/70 text-xs">VALID THRU</div>
            <div className="font-mono">{card.validThru}</div>
          </div>
          <div>
            <div className="text-white/70 text-xs">CVV</div>
            <div className="font-mono">{card.cvv}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
