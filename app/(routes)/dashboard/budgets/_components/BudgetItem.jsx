import Link from "next/link";
import React from "react";

function BudgetItem({budget }) {
  console.log("Budget Object:", budget);
  const calculateProgressPerc=( )=>{
    // (spend/total)*100
    const perc=(budget.totalSpend/budget.amount)*100;
    return perc.toFixed(2);
    }

  return (
<Link href={'/dashboard/expenses/'+budget?.id} className="p-6 bg-white border rounded-lg mr-3 ml-3 hover:shadow-md cursor-pointer h-[170px]">
    <div className=" flex gap-2 items-center justify-between" >
      <div className="flex gap-2 items-center">
        <h2 className=" mt-4 text-3xl p-3 px-4 bg-slate-100 rounded-full">
          {budget?.icon}
        </h2>
        <div>
          <h2 className="font-bold">{budget.name}</h2>
          <h2 className="text-sm text-gray">{budget.totalItem} Item</h2>
        </div>
      
      </div>
      <h2 className="font-bold text-primary  text-lg ">₹{budget.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
            ₹{budget.totalSpend?budget.totalSpend:0} spend
            </h2>
            <h2 className="text-xs text-slate-400">
            ₹{budget.amount-budget.totalSpend} remaining
            </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
            <div className=" bg-primary h-2 rounded-full" 
            style={{
width: `${calculateProgressPerc()}%`}}

            >
               
            </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;

// import React from "react";

// function BudgetItem({ budget }) {
//   // Calculate percentage of the amount spent
//   const totalSpend = budget.totalSpend || 0;  // Default to 0 if totalSpend is undefined
//   const remaining = budget.amount - totalSpend;
//   const spendPercentage = (totalSpend / budget.amount) * 100;  // Calculate spend percentage

//   return (
//     <div className="p-6 bg-white border rounded-lg mx-3 hover:shadow-md cursor-pointer transition-shadow duration-200">
//       <div className="flex gap-4 items-center justify-between">
//         <div className="flex gap-4 items-center">
//           <h2 className="mt-4 text-3xl p-3 px-4 bg-slate-100 rounded-full">
//             {budget?.icon}
//           </h2>
//           <div>
//             <h2 className="font-bold text-lg">{budget.name}</h2>
//             <h2 className="text-sm text-gray-500">{budget.totalItem} Item(s)</h2> {/* Fixed text color class */}
//           </div>
//         </div>
//         <h2 className="font-bold text-primary text-lg">₹{budget.amount}</h2>
//       </div>
//       <div className="mt-5">
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="text-xs text-slate-500">
//             ₹{totalSpend} spent
//           </h2>
//           <h2 className="text-xs text-slate-500">
//             ₹{remaining} remaining
//           </h2>
//         </div>
//         <div className="w-full bg-slate-300 h-2 rounded-full">
//           {/* Dynamic width for the progress bar based on spend percentage */}
//           <div
//             className="bg-primary h-2 rounded-full"
//             style={{ width: `${spendPercentage}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BudgetItem;



// import Link from "next/link";
// import React from "react";

// function BudgetItem({ budget }) {
//   console.log("Budget Object:", budget);

//   // Check if the budget object is undefined or null
//   if (!budget) {
//     return <div className="p-6 bg-white border rounded-lg">No budget data available</div>;
//   }

//   return (
//     <Link href={'/dashboard/expenses/' + budget?.id} className="p-6 bg-white border rounded-lg mr-3 ml-3 hover:shadow-md cursor-pointer">
//       <div className="flex gap-2 items-center justify-between">
//         <div className="flex gap-2 items-center">
//           <h2 className="mt-4 text-3xl p-3 px-4 bg-slate-100 rounded-full">
//             {budget?.icon}
//           </h2>
//           <div>
//             <h2 className="font-bold">{budget?.name || "Unknown Budget"}</h2>
//             <h2 className="text-sm text-gray">{budget?.totalItem || 0} Item(s)</h2>
//           </div>
//         </div>
//         <h2 className="font-bold text-primary text-lg">₹{budget?.amount || 0}</h2>
//       </div>
//       <div className="mt-5">
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="text-xs text-slate-400">
//             ₹{budget?.totalSpend || 0} spent
//           </h2>
//           <h2 className="text-xs text-slate-400">
//             ₹{(budget?.amount || 0) - (budget?.totalSpend || 0)} remaining
//           </h2>
//         </div>
//         <div className="w-full bg-slate-300 h-2 rounded-full">
//           <div
//             className="bg-primary h-2 rounded-full"
//             style={{ width: `${(budget?.totalSpend / budget?.amount) * 100}%` }}
//           ></div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default BudgetItem;
