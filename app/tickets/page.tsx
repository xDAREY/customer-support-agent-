import { Layout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const newTickets = [
  { id: '1', customer: 'Alice Johnson', subject: 'Order Delay', priority: 'High' },
  { id: '2', customer: 'Bob Williams', subject: 'Product Inquiry', priority: 'Medium' },
  { id: '3', customer: 'Carol Davis', subject: 'Refund Request', priority: 'Low' },
]

const resolvedCases = [
  { id: '1', customer: 'David Brown', subject: 'Missing Item', resolvedBy: 'Agent Smith' },
  { id: '2', customer: 'Eva Wilson', subject: 'Account Access', resolvedBy: 'Agent Johnson' },
  { id: '3', customer: 'Frank Taylor', subject: 'Shipping Address Change', resolvedBy: 'Agent Davis' },
]

export default function TicketsPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Tickets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {newTickets.map((ticket) => (
                  <li key={ticket.id} className="flex justify-between items-center p-3 bg-white shadow rounded-lg">
                    <div>
                      <p className="font-medium">{ticket.customer}</p>
                      <p className="text-sm text-gray-500">{ticket.subject}</p>
                    </div>
                    <Badge variant={ticket.priority === 'High' ? 'destructive' : ticket.priority === 'Medium' ? 'default' : 'secondary'}>
                      {ticket.priority}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resolved Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {resolvedCases.map((ticket) => (
                  <li key={ticket.id} className="flex justify-between items-center p-3 bg-white shadow rounded-lg">
                    <div>
                      <p className="font-medium">{ticket.customer}</p>
                      <p className="text-sm text-gray-500">{ticket.subject}</p>
                    </div>
                    <p className="text-sm text-gray-500">Resolved by: {ticket.resolvedBy}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

