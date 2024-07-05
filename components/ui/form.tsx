import * as React from 'react';
import * as LabelPrimitive from "@radix-ui/react-label" //Radix UI primitive for labels, which provides accessible label components.
import { Slot } from "@radix-ui/react-slot" // Radix UI component for composability, allowing you to pass components or elements as children.
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils" //A utility function to combine class names conditionally.
import { Label } from "@/components/ui/label"


const Form = FormProvider  // is used to provide form context to its children components.

//FormFieldContext
type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name : TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

//FormField Component
/* FormField: A component that wraps Controller from React Hook Form.
It provides the form field's name to its children via FormFieldContext.*/
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}




//useFormField Hook
/*useFormField: A custom hook to access form field state and context.
Retrieves context values from FormFieldContext and FormItemContext.
Uses useFormContext from React Hook Form to get field state. */
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()
  
    const fieldState = getFieldState(fieldContext.name, formState)
  
    if (!fieldContext) {
      throw new Error("useFormField should be used within <FormField>")
    }
  
    const { id } = itemContext
  
    return {
      id,
      name: fieldContext.name,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
      ...fieldState,
    }
}


//FormItemContext
/*FormItemContextValue: Type definition for the context value, specifying the form item's ID.
FormItemContext: React context to hold the form item's ID.*/

type FormItemContextValue = {
    id: string
}
  
  const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)


//FormItem Component
/*FormItem: A component that provides a context with a unique ID for each form item.
Uses React.useId to generate a unique ID and provides it via FormItemContext. */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"



//FormLabel Component
/*FormLabel: Custom label component that integrates with form field context.
Uses useFormField to get field state and dynamically applies error styles. */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"



//FormControl Component
/*FormControl: Custom control component for form fields.
Sets ARIA attributes for accessibility based on field state. */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"




//FormDescription Component
/*FormDescription: Renders a description for a form field.
Uses useFormField to get the description ID. */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"


//FormMessage Component
/*FormMessage: Renders an error message or custom message for a form field.
Uses useFormField to get the message ID and error state.
Conditionally renders the error message or custom children. */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"



export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
}
  
