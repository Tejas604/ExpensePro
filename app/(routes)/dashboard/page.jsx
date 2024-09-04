"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { eq, getTableColumns, sql, desc } from 'drizzle-orm';
import { db } from 'utils/dbConfig';
import { Budgets, Expenses } from 'utils/schema';


function Dashboard() {
  const {user}=useUser();

    const [budgetList, setBudgetList] = useState([]);
 

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
    <div className='p-8'>
      <h2 className='font-bold text-3xl'> 
      Hi,{user?.fullName}✌️  </h2>
      <p className='text-gray-500' >
        Here's what hapbupening with your money, lets manage your expense
      </p>
      <CardInfo  budgetList={budgetList}/>

    </div>
  )
}

export default Dashboard
