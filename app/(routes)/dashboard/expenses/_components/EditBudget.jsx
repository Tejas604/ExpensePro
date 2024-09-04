"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import {

    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
import { db } from 'utils/dbConfig';
import { Budgets } from 'utils/schema';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

function EditBudget({budgetInfo, refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const { user } = useUser();
    useEffect(()=>{
      if(budgetInfo){

        setEmojiIcon(budgetInfo?.icon)  
        setAmount(budgetInfo?.amount);
        setName(budgetInfo.name);
      }
    },[budgetInfo])
    const onUpdateBudget=async()=>{
      const result = await db.update(Budgets).set({
        name:name,
        amount:amount,
        icon:emojiIcon,
      }).where(eq(Budgets.id,budgetInfo.id))
      .returning();
      if(result){
        refreshData();
        toast('Budget Updated!')
      }
    }
  
  return (
    <div>
 
      <Dialog>
        <DialogTrigger asChild>
        <Button className='flex gap-2'>
        <PenBox/>
        edit
      </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-7 relative">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (  // Show Emoji Picker conditionally
                  <div className="absolute z-20 mt-2">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-4">
                  <h2 className="text-black font-medium mb-1">Budget Name</h2>
                  <Input
                    placeholder="e.g Home Decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) =>setName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-black font-medium mb-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g 5000 ₹"
                    defaultValue={budgetInfo?.amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={()=>onUpdateBudget()}
                className="mt-5 w-full"
              >
                update budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget
