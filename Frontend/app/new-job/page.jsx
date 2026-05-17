"use client";

import { getToken } from "/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const router = useRouter();

useEffect(() => {
  const token = getToken();

  if (!token) {
    router.push("/login");
  }
}, []);