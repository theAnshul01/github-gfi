import * as Select from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"

type Props = {
  value: string
  onChange: (value: string) => void
}

const languages = [
  { label: "All Languages", value: "all" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Go", value: "go" },
  { label: "Java", value: "java" },
]

export default function LanguageSelect({ value, onChange }: Props) {
  return (
    <Select.Root
      value={value || "all"}
      onValueChange={(val) => onChange(val === "all" ? "" : val)}
    >
      <Select.Trigger
        className="inline-flex items-center justify-between 
          px-4 py-3 rounded-xl border 
          bg-white dark:bg-gray-800
          w-[220px] text-sm
          focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="bg-white dark:bg-gray-800 
            rounded-xl shadow-xl border 
            overflow-hidden z-50"
        >
          <Select.Viewport className="p-1">
            {languages.map((lang) => (
              <Select.Item
                key={lang.value}
                value={lang.value}
                className="relative flex items-center px-8 py-2 
                  text-sm rounded-md
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  cursor-pointer outline-none dark:text-gray-50"
              >
                <Select.ItemText>
                  {lang.label}
                </Select.ItemText>

                <Select.ItemIndicator className="absolute left-2">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}