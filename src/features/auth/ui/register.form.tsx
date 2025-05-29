import { Button } from "@/shared/ui/kit/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../model/use-register";
import { LoaderPinwheel } from "lucide-react";

const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "Email обязателен",
      })
      .email("Неверный email"),
    password: z
      .string({
        required_error: "Пароль обязателен",
      })
      .min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string({
      required_error: "Повтор пароля обязателен",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { errorMessage, isPending, register, resetError } = useRegister();

  const onSubmit = form.handleSubmit(register);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="admin@gmail.com"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.clearErrors();
                    resetError();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.clearErrors();
                    resetError();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.clearErrors();
                    resetError();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}

        <Button disabled={isPending} type="submit">
          {isPending ? (
            <LoaderPinwheel className="animate-spin w-4 h-4 mr-2" />
          ) : null}
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}
