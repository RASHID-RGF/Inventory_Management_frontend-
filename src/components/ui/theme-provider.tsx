import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'
import type { ThemeProviderProps as NextThemesProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = useNextTheme