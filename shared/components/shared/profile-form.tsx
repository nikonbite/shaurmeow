'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormRegisterValues, formRegisterSchema } from './modals/auth-modal/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';
import { User as UserIcon, LogOut, Save } from 'lucide-react';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  // Генерируем инициалы
  const initials = data.fullName
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  return (
    <div className="flex flex-col items-center justify-center my-10 gap-8">
      {/* Верхний блок профиля */}
      <div className="w-full max-w-md bg-gradient-to-br from-primary/10 to-card rounded-2xl shadow-xl border border-border/50 p-8 flex flex-col items-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl opacity-40" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl opacity-40" />
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg mb-4 border-4 border-background">
          {initials || <UserIcon size={40} />}
        </div>
        <div className="text-center mb-4">
          <div className="text-2xl font-extrabold mb-1">{data.fullName}</div>
          <div className="text-muted-foreground text-base">{data.email}</div>
          <div className="text-xs text-muted-foreground mt-1">ID: {data.id}</div>
        </div>
        <div className="flex gap-3 justify-center mt-2">
          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base flex items-center gap-2 px-5"
            type="button">
            <LogOut size={18} /> Выйти
          </Button>
        </div>
      </div>

      {/* Форма редактирования */}
      <div className="w-full max-w-md bg-card text-foreground rounded-2xl shadow-lg border border-border/50 p-8">
        <Title text="Редактировать профиль" size="sm" className="font-bold mb-6 text-center" />
        <FormProvider {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="email" label="E-Mail" required />
            <FormInput name="fullName" label="Полное имя" required />

            <FormInput type="password" name="password" label="Новый пароль" required />
            <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

            <Button disabled={form.formState.isSubmitting} className="text-base mt-6 flex items-center gap-2 justify-center" type="submit">
              <Save size={18} /> Сохранить
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
