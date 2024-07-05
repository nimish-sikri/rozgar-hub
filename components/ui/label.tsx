"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)


/*
Label: A React functional component created using React.forwardRef. This allows the component to accept a ref prop, which can be used to reference the DOM element.
React.ElementRef<typeof LabelPrimitive.Root>: TypeScript type for the reference, ensuring it points to the correct type of DOM element.
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>: TypeScript type for the component's props, excluding the ref prop.
VariantProps<typeof labelVariants>: TypeScript type for the variant props defined by class-variance-authority.

This is the functional component body. It destructures className and other props, along with ref.
LabelPrimitive.Root: The actual label element from @radix-ui/react-label.
ref={ref}: Attaches the forwarded ref to the LabelPrimitive.Root element.
className={cn(labelVariants(), className)}: Combines the default styles from labelVariants with any additional className provided via props using the cn utility.
{...props}: Spreads any other props onto the LabelPrimitive.Root element, allowing for additional customization. */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
/*This code defines a Label component that leverages Radix UI primitives and class-variance-authority to create a flexible, accessible, and styleable label component for forms or other UI elements. It ensures consistent styling and behavior across the application while allowing for customization through props and CSS classes. */