import { cn } from '@/shared/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1400px]', className)}>
      {children}
    </div>
  );
};
