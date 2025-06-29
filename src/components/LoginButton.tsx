// components/LoginButton.tsx
import {cn} from "@/lib/utils";
import { ArrowRightIcon } from 'lucide-react'; // You can use any icon

interface LoginButtonProps {
  href: string;
  text: string;
    className: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ className,href, text }) => {
  return (
    <div className={cn("hidden   flex-row items-center justify-between lg:flex lg:gap-5",className)}>
      <a
        href={href}
        className="flex h-9 items-center justify-center gap-2 rounded-full px-4 font-medium leading-normal text-white min-w-[154px] bg-brand py-[10px] dark:text-darkText-500 md:h-[42px] md:w-[154px] dark:hover:bg-darkBtn-200"
      >
        <p className="align-middle text-black mb-[2px] md:text-[15px]">{text}</p>
        <span className="flex items-center">
          <ArrowRightIcon className="h-6 w-6 text-black" />
        </span>
      </a>
    </div>
  );
};
