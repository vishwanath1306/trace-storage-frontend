import { extendTheme } from '@chakra-ui/react';

// Extend the default theme to customize it.
// Add your color modes, component styles, fonts, etc.
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'gray.50', // Background color
        color: 'black', // Text color
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  components: {
    Button: {
      // You can customize the button component as needed
      baseStyle: {
        fontWeight: 'bold', // Normally, it's "semibold"
      },
    },
    // Any other component customizations can go here
  },
  // You can also add custom colors, fonts, etc.
});

export default theme;
