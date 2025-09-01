import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { BillingInfo } from "@/types/dashboard"

interface BillingInfoCardProps {
  billingInfo: BillingInfo[]
}

export function BillingInfoCard({ billingInfo }: BillingInfoCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
      <h3 className="text-lg font-semibold mb-6">Billing Information</h3>

      <div className="space-y-4">
        {billingInfo.map((info) => (
          <div key={info.id} className="p-4 rounded-lg border border-white/10 bg-white/5">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="font-medium">{info.name}</div>
                <div className="text-sm text-white/70">Company Name: {info.companyName}</div>
                <div className="text-sm text-white/70">Email Address: {info.email}</div>
                <div className="text-sm text-white/70">VAT Number: {info.vatNumber}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
                  <Trash2 className="w-4 h-4 mr-1" />
                  DELETE
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-white/70 border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  EDIT
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

