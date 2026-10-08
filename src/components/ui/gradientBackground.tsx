import { ReactNode } from "react"
import { LinearGradient } from "expo-linear-gradient"

export function GradientBackground({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={["#F3949B", "#DC5863", "#B23645"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.35 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )
}
