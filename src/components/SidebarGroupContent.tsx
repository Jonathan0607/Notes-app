"use client";

import { Note } from "@prisma/client";

type Props = {
  notes: Note[]; // Adjust the type as necessary for your notes data
};

function SidebarGroupContent({ notes} : Props) {
    console.log(notes);
    return ( <div>Your Notes Here</div> );
}

export default SidebarGroupContent;