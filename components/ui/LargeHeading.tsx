import { FC } from 'react'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const headingVariants = cva(
  'text-dimPurple sm:pb-7 md:pb-9 pb-4 text-center font-extrabold leading-tight tracking-tighter',
  {
    variants: {
      size: {
        default: 'text-xl md:text-2xl lg:text-3xl',
        lg: 'text-2xl md:text-3xl lg:text-4xl',
        sm: 'text-sm md:text-base lg:text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface LargeHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const LargeHeading: FC<LargeHeadingProps> = ({
  children,
  className,
  size,
  ...props
}) => {
  return (
    <h1 {...props} className={cn(headingVariants({ size, className }))}>
      {children}
    </h1>
  )
}

export default LargeHeading