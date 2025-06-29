'use client';

import { logoutAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, LogOut } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {cn} from "@/lib/utils";
import { ROUTES } from '@/lib/constants';

export default function LogoutForm({ className }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction(); // اجرای server action
      toast.success('با موفقیت خارج شدید!');
      router.push(ROUTES.AUTH); // هدایت به صفحه لاگین یا صفحه اصلی
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type='button'
          className={cn(
            'flex items-center direction-rtl hover:bg-gray-50 text-right w-full px-3 py-1 text-sm leading-6 text-gray-900',
            className
          )}
        >
          <LogOut className='ml-2 h-4 w-4' />
          <span>خروج</span>
        </button>
      </DialogTrigger>

      <DialogContent dir='rtl'>
        <DialogHeader className='items-center justify-center text-center'>
          <DialogTitle>خروج</DialogTitle>
          <DialogDescription className='text-center'>
            <LogOut className='h-20 w-72 py-4 text-red-600' />
            آیا مایلید از حساب کاربری خود خارج شوید؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex items-center justify-center gap-2 sm:justify-center'>
          <Button
            onClick={handleLogout}
            variant='destructive'
            className='ml-2'
            isLoading={isPending}
            disabled={isPending}
          >
            {isPending ? 'در حال خروج...' : 'تأیید خروج'}
          </Button>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <ArrowRight className='ml-1 h-4 w-4' />
              بازگشت
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
