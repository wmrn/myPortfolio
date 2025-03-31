// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors:{
    primary: '#2176A8',
    primary_light: '#B0C4D8',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: { myCustomLightTheme},
  }
})
