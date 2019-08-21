import App from '../components/App'
import Header from '../components/Header'
import Box from '../components/atoms/Box'

export default () => (
  <App>
    <Header />
    <Box
      color="primary" // Derived from theme.tsx
      width={[
        1, // 100% below the smallest breakpoint (all viewports)
        1 / 2, // 50% from the next breakpoint and up
        1 / 4 // 25% from the next breakpoint and up
      ]}
    >
      React App
    </Box>
  </App>
)
