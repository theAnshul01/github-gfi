import * as Select from "@radix-ui/react-select"
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons"
import type { SortOption } from "../types/filters"

interface Props {
    value: string
    onChange: (value: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "most-commented", label: "Most Commented" },
    { value: "recently-updated", label: "Recently Updated" },
]

export default function SortSelect({ value, onChange }: Props) {
    return (
        <Select.Root value={value} onValueChange={(v) => onChange(v as SortOption)}>

            {/* Trigger */}
            <Select.Trigger
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border 
        bg-white dark:bg-gray-800 shadow-sm hover:shadow-md
        transition min-w-[200px]"
            >
                <Select.Value placeholder="Sort by..." />
                <Select.Icon>
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>

            {/* Dropdown */}
            <Select.Portal>
                <Select.Content
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border
          animate-in fade-in zoom-in-95"
                >
                    <Select.Viewport className="p-2">

                        {sortOptions.map((option) => (
                            <Select.Item
                                key={option.value}
                                value={option.value}
                                className="flex items-center justify-between px-3 py-2 rounded-lg
                cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100
                outline-none"
                            >
                                <Select.ItemText>{option.label}</Select.ItemText>

                                <Select.ItemIndicator>
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