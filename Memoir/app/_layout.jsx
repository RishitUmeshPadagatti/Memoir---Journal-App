import { getToken } from "@/functions/SecureStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

export default function Root() {
  return (
    <RecoilRoot>
      <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
      </Stack>
    </RecoilRoot>
  );
}