"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import useNote from "@/hooks/useNote";
import { debounceTimeout } from "@/lib/constants";
import { updateNoteAction } from "@/actions/notes";


type Props = {
    noteId: string;
    startingNoteText: string;
}

let updateTimer: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
    const noteIdParams = useSearchParams().get("noteId") || "";
    const { noteText, setNoteText } = useNote()

    useEffect(() => {
        if (noteIdParams == noteId) {
            setNoteText(startingNoteText);
        }
    }, [startingNoteText, noteIdParams, noteId, setNoteText,]);

    const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setNoteText(text);

        clearTimeout(updateTimer);
        updateTimer = setTimeout(() => {
            updateNoteAction(noteId, text);
        }, debounceTimeout);


        console.log(`Updating note ${noteId} with text`);

    }

    return (
        <Textarea
            value={noteText}
            onChange={handleUpdateNote}
            placeholder="Type your note here..."
            className="mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0
            focus-visible:ring-offset-0"
        />
    );
}

export default NoteTextInput;

