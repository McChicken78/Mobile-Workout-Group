import { ReactNode } from "react"
import { LinearGradient } from "expo-linear-gradient"

export function GradientBackground({ children }: { children: ReactNode }) {
   return (
      <LinearGradient
         colors={["#F2706A", "#CF4673"]}
         style={{ flex: 1 }}
      >
         {children}
      </LinearGradient>
   )
}