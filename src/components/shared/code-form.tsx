"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import LoadingButton from "@/components/common/buttons/loading-button";
import {
  useResendCodeMutation,
  useVerifyMutation,
} from "@/hooks/auth/use-auth-mutations-hooks";
import { useForgetCodeMutation } from "@/hooks/auth/use-forget-password-steps-hooks";
import { Loader2Icon } from "lucide-react";
import CountdownTimer from "./countdown-timer";

type Props = {
  email: string;
  handleForms: (form: string) => void;
  isRTL: boolean;
  setCode?: (code: string) => void;
  inRegister?: boolean;
};

const CodeForm = ({
  email,
  setCode = () => {},
  handleForms,
  isRTL,
  inRegister,
}: Props) => {
  const router = useRouter();
  const formSchema = z.object({
    code: z
      .string()
      .min(1, { message: isRTL ? "الكود مطلوب" : "Code is required" }),
  });

  const [time, setTime] = useState<number>(60);
  const timerRef = useRef<any>();

  const handleReset = () => {
    timerRef.current.resetTimer();
  };

  const { mutate: mutateCode, isPending: isVerifyPending } =
    useForgetCodeMutation({
      handleForms: () => {
        handleForms("newPassForm");
        setCode(form.getValues("code"));
      },
    });
  const { mutate: resend, isPending: isResendPending } = useResendCodeMutation({
    handleFunction: () => {
      handleReset();
    },
  });
  const { mutate, isPending } = useVerifyMutation({
    handleForms: () => {
      handleForms("newPassForm");
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    inRegister
      ? mutate({ verification_code: data.code } as any)
      : mutateCode({ code: data.code, email } as any);
  };

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center justify-center space-y-8">
      <h2 className="w-full max-w-[440px] text-sm font-[400] leading-[30px] text-muted-foreground">
        {isRTL
          ? "من فضلك تفقد البريد الالكتروني"
          : `Please check your email at`}
        <span className="mx-1 font-[700] text-primary">{email}</span>
        {isRTL
          ? inRegister
            ? "لتفعيل حسابك، الرجاء ادخال الكود المرسل اليك"
            : "لتلقي كود لاعادة تعيين كلمة المرور. الرجاء أدخال الكود التالي للاعادة تعيين كلمة المرور"
          : inRegister
            ? "to activate your account. Kindly enter the code below to proceed"
            : "to receive the password reset code. Kindly enter the code below to proceed."}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormFields
            control={form.control}
            name="code"
            label={isRTL ? "كود التحقق" : "Enter code"}
            holder={""}
          />

          <LoadingButton
            isLoading={isPending || isVerifyPending}
            variant="default"
            className="h-[50px] w-full"
          >
            <span className="text-lg">{isRTL ? "تأكيد" : "Confirm"}</span>
          </LoadingButton>

          <div className="flex w-full flex-col items-center justify-center gap-4 py-4 text-center">
            <CountdownTimer ref={timerRef} time={time} setTime={setTime} />
            {isResendPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <p
                className={`text-sm underline ${time > 0 ? "cursor-default text-secondary-gray" : "cursor-pointer text-primary"}`}
                onClick={() => (time > 0 ? null : resend({ email } as any))}
              >
                {isRTL ? "اعادة ارسال كود التحقق؟" : "Resend reset  Code?"}
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CodeForm;
