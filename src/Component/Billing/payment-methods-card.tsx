import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Check } from "lucide-react"
import type { CreditCard } from "@/types/dashboard"

interface PaymentMethodsCardProps {
  paymentMethods: CreditCard[]
}

export function PaymentMethodsCard({ paymentMethods }: PaymentMethodsCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        <Button
          size="sm"
          variant="outline"
          className="text-blue-400 border-blue-400 hover:bg-blue-400/10 bg-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          ADD A NEW CARD
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method, index) => (
          <div
            key={method.id}
            className="relative p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
       <div
  className={`w-8 h-5 rounded overflow-hidden flex items-center justify-center`}
>
  {method.type === "mastercard" ? (
    <img src="images/card.svg" alt="MasterCard" className="w-full h-full object-contain" />
  ) : (
    <span className="text-xs font-bold text-white">VISA</span>
  )}
</div>

                <span className="text-sm font-mono">{method.number}</span>
              </div>
              {index === 0 && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

