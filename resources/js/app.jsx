import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { Theme} from "@radix-ui/themes"

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <Theme
          accentColor="green"      // Primary color (closest to your #2a4a3d)
          grayColor="mauve"         // Neutral colors (complements green)
          radius="medium"          // Border radius
          scaling="95%"            // Overall scaling
          panelBackground="solid"  // Background style
      >
        <App {...props} />
      </Theme>
    )
  },
})
