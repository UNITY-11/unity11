"use client";

import { useState } from "react";
import Image from "next/image";

import { getAuthorInitials } from "@/lib/utils";

interface AuthorAvatarProps {
  name: string;
  avatar?: string;
  size?: number;
}

export function AuthorAvatar({ name, avatar, size = 48 }: AuthorAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showInitials = imageError || !avatar;

  if (showInitials) {
    return (
      <div
        className="rounded-full overflow-hidden border border-white/20 bg-linear-to-br from-[#2052bd] to-[#7fcbe4] flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
        aria-label={name}
      >
        <span className="text-white font-semibold text-sm">
          {getAuthorInitials(name)}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-full overflow-hidden border border-white/20 shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={avatar}
        alt={name}
        fill
        unoptimized
        onError={() => setImageError(true)}
        className="object-cover"
      />
    </div>
  );
}
