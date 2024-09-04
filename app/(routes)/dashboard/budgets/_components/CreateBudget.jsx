"use client";

import React, { useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "utils/dbConfig";

function CreateBudget({ refreshData }) {  // Corrected `refershData` to `refreshData`
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  /** Used to create the new budget */
  const onCreateBudget = async () => {
    try {
      const result = await db.insert(Budgets)
        .values({
          name: name,
          amount: amount,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon
        }).returning({ insertedId: Budgets.id });

      if (result) {
        refreshData();
        toast.success('New Budget Created!');  // Improved toast message
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget.");  // Added error handling toast
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-6 rounded-lg flex flex-col items-center border-2 border-dashed border-gray-300
                       cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-4xl text-gray-600 mb-2">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-black font-medium mb-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g 5000 ₹"
                    value={amount}
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
                onClick={onCreateBudget}
                className="mt-5 w-full"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
