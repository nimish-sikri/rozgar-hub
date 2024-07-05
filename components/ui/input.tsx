import * as React from "react"
import { cn } from "@/lib/utils" //this is a utility function for conditionally joining class names. It’s typically used to concatenate multiple class names and apply them based on conditions.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

  //React.forwardRef: This is a special function in React that allows you to forward refs to the child component. In this case, it forwards the ref to the <input> element.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"
export { Input }
