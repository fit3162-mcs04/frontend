"use client"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
  itemClassName?: string
  activeItemClassName?: string
  separatorClassName?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight size={16} />,
  className = "",
  itemClassName = "hover:text-slate-900 dark:hover:text-slate-500 hover:underline",
  activeItemClassName = "text-slate-900 dark:text-slate-200 font-medium",
  separatorClassName = "mx-1 text-slate-400 dark:text-slate-500",
}) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex items-center text-slate-600 text-xs md:text-sm dark:text-slate-400", className)}>
        {items.map((item, index) => (
          <li key={`${item.href ?? "nohref"}-${item.label}`} className="flex items-center">

            {index > 0 && (
              <span className={separatorClassName} aria-hidden="true">
                {separator}
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className={cn(itemClassName, "flex items-center")}>
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className={cn("flex items-center", activeItemClassName)} aria-current="page">
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </span>
            )}

          </li>
        ))}
      </ol>
    </nav>
  )
}
