import { Search } from 'lucide-react'
import { Input } from './Input'
import { cn } from '@/utils/cn'

export default function SearchInput({ value, onChange, placeholder = 'Search…', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-400" />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  )
}
