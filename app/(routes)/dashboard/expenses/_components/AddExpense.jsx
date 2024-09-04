import React,{ useState } from "react";
import { Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Budgets, Expenses } from 'utils/schema';
import { db } from "utils/dbConfig";
import { toast } from "sonner";
import moment from "moment";
import { User } from "lucide-react";
function AddExpense({budgetId, user,refreshData}) {
    const[name, setName] =useState();
const [amount, setAmount] =useState();
const addNewExpense=async()=>{
    const result=await db.insert(Expenses).values({
    name: name,
    amount:amount,
    budgetId:parseInt(budgetId),
    createdAT:moment().format('DD/MM/YY')
    }).returning({insertedId:Budgets.id});
    console.log(result);
    if(result){
        refreshData()
        toast('new expenses is Added!')
    }
}
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-4">
        <h2 className="text-black font-medium mb-1">Expense Name</h2>
        <Input
          placeholder="e.g Home Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-black font-medium mb-1">Expenses Amount</h2>
        <Input
         type="number"
         placeholder="e.g 5000 ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name&&amount)}
      onClick={() =>addNewExpense()}
      className ='mt-3 w-full'> Add New Expense</Button>


    </div>
  );
}

export default AddExpense;
