import { useActionState } from "react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { submittingForm } from "@/app/lib/actions";
import {
  XMarkIcon,
  PhoneIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { TechniqueType } from "@/app/lib/definitions";
import { Select } from "../select/select";

interface FeedbackFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  technique: TechniqueType[];
}

export const FeedbackForm = ({
  isOpen = true,
  onClose,
  technique,
}: FeedbackFormProps) => {
  const [errorMessage, formAction, isPending] = useActionState(
    submittingForm,
    undefined
  );

  if (!isOpen && technique.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all sm:max-w-lg lg:max-w-xl">
          <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 sm:px-8 sm:py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Обратная связь
                </h3>
                <p className="mt-1 text-sm text-gray-800 sm:text-base">
                  Оставьте заявку и мы свяжемся с вами
                </p>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-700 hover:bg-white/20 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="technique"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4 text-yellow-500" />
                  Техника
                </label>
                <div className="relative">
                  <Select items={technique} />
                  {errorMessage?.errors?.technique && (
                    <p className="mt-1 text-xs text-red-600">
                      {errorMessage.errors.technique}
                    </p>
                  )}
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <UserIcon className="h-4 w-4 text-yellow-500" />
                  Имя
                </label>
                <div className="relative">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Как к Вам обращаться?"
                    iconSerach={false}
                  />
                  {errorMessage?.errors?.name && (
                    <p className="mt-1 text-xs text-red-600">
                      {errorMessage.errors.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="telephone"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <PhoneIcon className="h-4 w-4 text-yellow-500" />
                  Телефон
                </label>
                <div className="relative">
                  <Input
                    name="telephone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    iconSerach={false}
                  />
                  {errorMessage?.errors?.telephone && (
                    <p className="mt-1 text-xs text-red-600">
                      {errorMessage.errors.telephone}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <EnvelopeIcon className="h-4 w-4 text-yellow-500" />
                  Почта
                </label>
                <div className="relative">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Укажите Вашу электронную почту"
                  />
                  {errorMessage?.errors?.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errorMessage.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4 text-yellow-500" />
                  Вопросы
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none"
                    placeholder="Задайте ваши вопросы по аренде техники..."
                  />
                  {errorMessage?.errors?.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {errorMessage.errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Отправка...
                    </div>
                  ) : (
                    "Отправить заявку"
                  )}
                </Button>
              </div>

              {errorMessage?.message && (
                <div
                  className={`mt-4 rounded-lg p-3 text-sm ${
                    errorMessage.message.includes("успешно")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {errorMessage.message}
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a
                  href="#"
                  className="text-yellow-600 hover:text-yellow-700 underline"
                >
                  политикой конфиденциальности
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
