
// 'use client'
// import React, { useEffect, useState } from 'react';
// import CreateBudget from './CreateBudget';
// import { db } from 'utils/dbConfig';
// import { eq, getTableColumns, sql ,desc} from 'drizzle-orm';
// import { Budgets, Expenses } from "utils/schema";
// import { useUser } from '@clerk/nextjs';
// import BudgetItem from './BudgetItem';
// import Budget from '../page';

// function BudgetList() {
//   const [budgetList, setBudgetList] = useState([]);
//   const { user } = useUser();

//   useEffect(() => {
//     user && getBudgetList(); // Corrected to call the function
//   }, [user]);

//   /** used to get the budget list */
//   const getBudgetList = async () => {
//     try {
//       const result = await db.select({
//         ...getTableColumns(Budgets),
//         totalSpend: sql`SUM(CAST(${Expenses.amount} AS numeric))`.mapWith(Number), // Cast to numeric
//         totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number)
//       }).from(Budgets)
//         .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//         .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
//         .groupBy(Budgets.id)
//         .orderBy(desc(Budget.id))


//       setBudgetList(result);
//       console.log(result);
//     } catch (error) {
//       console.error("Error fetching budget list:", error);
//     }
//   }

//   return (
//     <div className='mt-4 '>
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//         <CreateBudget 
//         refershData={()=>getBudgetList()}/>
//         { budgetList?.length>0?budgetList.map((budget, index) => (
//           <BudgetItem   budget={budget} key={index} ></BudgetItem> // Added key prop
//         ))
//         :[1,2,3,4,5].map((item,index)=>(
//           <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'> </div>
//         ))
//       }
//       </div>
//     </div>
//   )
// }

// export default BudgetList;

'use client'
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from 'utils/dbConfig';
import { eq, getTableColumns, sql, desc } from 'drizzle-orm';
import { Budgets, Expenses } from "utils/schema";
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  /** used to get the budget list */
  const getBudgetList = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(CAST(${Expenses.amount} AS numeric))`.mapWith(Number), // Cast to numeric
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number)
      }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));  // Fixed `desc(Budget.id)` to `desc(Budgets.id)`

      setBudgetList(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  }

  return (
    <div className='mt-6 px-4'>  
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'> 
        <CreateBudget 
          refreshData={getBudgetList}  // Corrected `refershData` to `refreshData`
        />
        {budgetList.length > 0 ? (
          budgetList.map((budget) => (
            <BudgetItem budget={budget} key={budget.id} /> 
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div> 
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;
