import { FC } from 'react'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const headingVariants = cva(
  'text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter',
  {
    variants: {
      size: {
        default: 'text-2xl md:text-3xl lg:text-4xl',
        lg: 'text-3xl md:text-4xl lg:text-5xl',
        sm: 'text-xl md:text-2xl lg:text-3xl',
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