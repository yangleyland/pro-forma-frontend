import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

function getData() {
  return [
    {
      id: "1",
      year: 2021,
      site: "Site A",
      loan_amount: 50000,
      trenching_costs: 10000,
      upgrade_cost_utility: 15000,
      upgrade_cost_customer: 5000,
      procurement_management_cost: 2000,
    },
    {
      id: "2",
      year: 2022,
      site: "Site B",
      loan_amount: 75000,
      trenching_costs: 20000,
      upgrade_cost_utility: 25000,
      upgrade_cost_customer: 8000,
      procurement_management_cost: 3000,
    },
  ]
}


export default  function DemoPage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
