import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function Provider({children}: {children: React.ReactNode}) {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  )
}

export default Provider;