import { getUser } from "@/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import SidebarGroupContent from "./SidebarGroupContent";
import Link from "next/link";

async function AppSidebar() {

  const user = await getUser();

  let notes: Note[] = []

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id
      }
      , orderBy: {
        createdAt: 'desc'
      }
    });
  }


  return (
    <Sidebar>
      <SidebarContent >
        <SidebarGroup />
        <SidebarGroupLabel className="mb-2 mt-2 text-lg">
          {user ? (
            "Your Notes"
          ) : (
            <p>
              <Link href="/login" className="underline">
              Login
              </Link>{" "}
              to see your notes
            </p>
          )}
        </SidebarGroupLabel>
        {user && <SidebarGroupContent notes={notes} />}
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar;