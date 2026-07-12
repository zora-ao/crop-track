import ExpenseList from "@/components/expenses/ExpenseList";
import ExpenseDialog from "@/components/expenses/ExpenseDialog";

export default function ExpensesPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Expenses
        </h1>

        <ExpenseDialog />
      </div>

      <ExpenseList />
    </div>
  );
}