"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fragment, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAction } from "@/actions/notes";

type Props = {
  user: User | null;
};

function AskAIButton({ user }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
      setOpen(isOpen);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAction(newQuestions, responses)
      setResponses(prev => [...prev, response])

      setTimeout(scrollToBottom, 100)
    })
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask AI</Button>
      </DialogTrigger>
      <DialogContent
        style={{ maxWidth: '80vw', width: '80vw', minWidth: 0, margin: 0 }}
        className="flex flex-col mx-auto rounded-lg bg-background shadow-lg p-0 h-[80vh]"
      >
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Ask AI About Your Notes</DialogTitle>
          <DialogDescription>
            Our AI can answer questions about all of your notes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4" ref={contentRef}>
          {questions.map((question, index) => (
            <Fragment key={index}>
              <div className="self-end max-w-[75%] bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow">
                {question}
              </div>
              {responses[index] && (
                <div className="self-start max-w-[75%] bg-muted text-muted-foreground rounded-xl px-4 py-2 shadow">
                  <span dangerouslySetInnerHTML={{ __html: responses[index] }} />
                </div>
              )}
            </Fragment>
          ))}
          {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
        </div>

        <form
          className="flex items-center gap-2 border-t p-4 bg-background"
          onClick={handleClickInput}
          onSubmit={e => { e.preventDefault(); handleSubmit(); }}
        >
          <Textarea
            ref={textareaRef}
            placeholder="Type your question..."
            className="flex-1 resize-none border-none bg-transparent p-2 shadow-none focus:ring-0"
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
          />
          <Button type="submit" className="size-10 rounded-full" disabled={!questionText.trim()}>
            <ArrowUpIcon className="text-background" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AskAIButton;