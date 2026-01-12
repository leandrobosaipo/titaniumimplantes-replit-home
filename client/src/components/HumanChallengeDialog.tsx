"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { humanChallengeMessages } from "@/data/messages";
import { useHumanVerification } from "@/hooks/useHumanVerification";

interface HumanChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: (token: string) => void;
}

export function HumanChallengeDialog({
  open,
  onOpenChange,
  onVerified,
}: HumanChallengeDialogProps) {
  const { requestVerification, isVerifying } = useHumanVerification();
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    setError(null);
    const token = await requestVerification();

    if (token) {
      onVerified(token);
      onOpenChange(false);
    } else {
      setError(humanChallengeMessages.errorVerificationFailed);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {humanChallengeMessages.rateLimitTitle}
          </DialogTitle>
          <DialogDescription className="pt-2 text-base leading-relaxed">
            {humanChallengeMessages.rateLimitDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}
          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full"
            style={{
              backgroundColor: "#1E4DD9",
              color: "#FFFFFF",
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              padding: "12px 24px",
            }}
          >
            {isVerifying
              ? humanChallengeMessages.verifying
              : humanChallengeMessages.verifyButton}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
