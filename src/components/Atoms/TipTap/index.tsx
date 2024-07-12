import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextBold, TextItalic } from "iconsax-react";
import { useEffect } from "react";

interface TipTapProps {
  value?: string;
  onChange?: (richText: string) => void;
  className?: string;
}

export default function TipTap({ value, onChange, className }: TipTapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "px-4 py-3 border border-gray-300 rounded-lg min-h-[150px] prose max-w-none w-full text-black prose-neutral",
      },
    },
    onUpdate({ editor }) {
      onChange && onChange(editor.getHTML());
      // console.log(editor.getJSON());
    },
  });

  //   const setHeading = (heading: number | string) => {
  //     editor!
  //       .chain()
  //       .focus()
  //       .toggleHeading({ level: Number(heading) })
  //       .run();
  //   };
  useEffect(() => {
    // this is just an example. do whatever you want to do here
    // to retrieve your editors content from somewhere
    let html = editor?.getHTML();
    if (html !== value && editor) {
      editor.commands.clearContent();
      editor?.commands.setContent(value!);
    }
    // if (editor) {
    //   editor.commands.clearContent();
    //   editor?.commands.setContent(value!);
    // }
  }, [value, editor]);
  return (
    <div className={className}>
      <div
        className={`flex flex-wrap items-center mb-3 border border-gray-200  rounded-lg px-3 py-2 divide-x-2`}
      >
        {/* Headings */}
        <div className={`flex items-center justify-center pr-3`}>
          <button
            onClick={() => {
              editor!.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={`${
              editor?.isActive("heading", { level: 1 }) && "bg-gray-200 "
            } p-2 rounded-lg mr-1`}
          >
            H1
          </button>
          <button
            onClick={() => {
              editor!.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={`${
              editor?.isActive("heading", { level: 2 }) && "bg-gray-200 "
            } p-2 rounded-lg mr-1`}
          >
            H2
          </button>
          <button
            onClick={() => {
              editor!.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={`${
              editor?.isActive("heading", { level: 3 }) && "bg-gray-200 "
            } p-2 rounded-lg mr-1`}
          >
            H3
          </button>
        </div>

        {/* Text Decoration */}
        <div className={`px-2 flex `}>
          <button
            onClick={() => {
              editor!.chain().focus().toggleBold().run();
            }}
            className={`${
              editor?.isActive("bold") && "bg-gray-200 "
            } p-2 rounded-lg mr-1`}
          >
            <TextBold className={`w-4 h-4`} />
          </button>
          <button
            onClick={() => {
              editor!.chain().focus().toggleItalic().run();
            }}
            className={`${
              editor?.isActive("italic") && "bg-gray-300 bg-opacity-50"
            } p-2 rounded-lg`}
          >
            <TextItalic className={`w-4 h-4`} />
          </button>
          <button
            onClick={() => {
              editor!.chain().focus().toggleStrike().run();
            }}
            className={`${
              editor?.isActive("strike") && "bg-gray-300 bg-opacity-50"
            } p-2 ml-1 rounded-lg`}
          >
            <div
              className={`flex justify-center items-center w-4 h-4 align-middle`}
            >
              <s>S</s>
            </div>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              editor!.chain().focus().toggleBulletList().run();
            }}
            className={`${
              editor?.isActive("bulletList") && "bg-gray-300 bg-opacity-50"
            } p-2 rounded-lg`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
