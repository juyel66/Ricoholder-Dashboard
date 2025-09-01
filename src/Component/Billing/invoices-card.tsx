import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Invoice } from "@/types/dashboard"

interface InvoicesCardProps {
  invoices: Invoice[]
}

export function InvoicesCard({ invoices }: InvoicesCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-br  from-slate-800 to-slate-900 text-white border-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Invoices</h3>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          VIEW ALL
        </Button>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">{invoice.date}</div>
              <div className="text-xs text-white/70">#{invoice.invoiceNumber}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">
                {invoice.currency}
                {invoice.amount}
              </div>
              <Badge variant="outline" className="text-white/70 border-white/20">
                PDF
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
