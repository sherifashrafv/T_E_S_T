"use client";

import React from "react";

import { Modal } from "@/components/common/modals/modal";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useOrderTypeStore } from "@/store";
import { StripeProvider } from "@/config/providers/StripeProvider";
import PaymentForm from "./confirm-stripe";

type Props = {
  isOpen: boolean;
  setIsOpen: () => void;
};

const ConfirmModal = ({ isOpen, setIsOpen }: Props) => {
  const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
  const { clientSecret } = useOrderTypeStore();

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={() => setIsOpen()}
      className="max-h-[650px] w-[95vw] overflow-y-auto rounded-md md:max-w-[400px]"
      title={isRTL ? "مصاريف الشحن" : "Shipping Fees"}
    >
      {clientSecret && (
        <StripeProvider>
          <PaymentForm closeModal={() => setIsOpen()} />
        </StripeProvider>
      )}
    </Modal>
  );
};

export default ConfirmModal;
