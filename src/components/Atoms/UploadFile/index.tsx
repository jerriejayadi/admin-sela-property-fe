import { useState, DragEvent } from "react";

interface UploadFileProps {
  id: string;
  onChange: (args: any) => void;
}

export default function UploadFile({ id, onChange }: UploadFileProps) {
  const [dragged, setDragged] = useState<boolean>(false);
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    setDragged(true);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setDragged(false);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    setDragged(false);
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer);
    onChange({ ...e, target: e.dataTransfer });
  };

  return (
    <div>
      <label htmlFor={`banner-image`} className={`text-gray-400`}>
        <div
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          className={`w-full py-10 flex flex-col items-center justify-center border border-dashed rounded-lg border-gray-400 hover:cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          <div className={`text-center`}>
            <span className={`font-bold`}>Click to Upload</span> or drag and
            drop it here
          </div>
          <div>Maximum file size is 8MB</div>
        </div>
      </label>
      <input
        multiple
        onChange={(e) => {
          onChange(e.target.files);
        }}
        id={id}
        type={`file`}
        hidden
        accept="image/png, image/jpeg"
        name={id}
      />
    </div>
  );
}
