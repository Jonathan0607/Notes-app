import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/db/prisma";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


async function HomePage({ searchParams }: Props) {
  const noteIdParams = (await searchParams).noteId
  const user = await getUser();

  const noteId = Array.isArray(noteIdParams) ? noteIdParams![0] : noteIdParams || "";

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user?.id,
    }
  })

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>);
}

export default HomePage;