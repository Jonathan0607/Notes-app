"use client";


import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from "uuid";
import { createNewNote } from "@/actions/notes";
import { toast } from "sonner";

type Props = {
    user: User | null
}

function NewNoteButton({ user }: Props) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleClickNewNoteButton = async () => {
        if (!user) router.push("/login");
        else {
            setLoading(true);

            const uuid = uuidv4();
            await createNewNote(uuid);
            router.push(`/?noteId=${uuid}`);

            toast.success("New note created successfully");
            setLoading(false);
        }
    };

    return (
         <Button
            onClick={handleClickNewNoteButton}
            variant="secondary"
            className="w-24 cursor-pointer"
            disabled={loading}
         >
            {loading ? <Loader2 className="animate-spin" /> : "New Note"}
         </Button>
    );
}

export default NewNoteButton;

