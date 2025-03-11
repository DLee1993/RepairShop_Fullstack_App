"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

type Props = {
    title: string;
    className?: string;
    variant?:
        | "default"
        | "destructive"
        | "ghost"
        | "outline"
        | "secondary"
        | "link"
        | null
        | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({ title, variant, className, ...props }: Props) {
    const router = useRouter();

    return (
        <Button
            title={title}
            variant={variant}
            className={className}
            {...props}
            onClick={() => router.back()}
        >
            {title}
        </Button>
    );
}
