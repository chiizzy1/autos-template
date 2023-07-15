import { FC } from 'react'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const headingVariants = cva(
  'text-dimPurple text-left font-bold leading-tight tracking-tighter',
  {
    variants: {
      size: {
        default: 'text-sm md:text-base lg:text-xl',
        lg: 'text-base md:text-xl lg:text-2xl',
        sm: 'text-sm md:text-base lg:text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface SmallHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const SmallHeading: FC<SmallHeadingProps> = ({
  children,
  className,
  size,
  ...props
}) => {
  return (
    <h3 {...props} className={cn(headingVariants({ size, className }))}>
      {children}
    </h3>
  )
}

export default SmallHeading