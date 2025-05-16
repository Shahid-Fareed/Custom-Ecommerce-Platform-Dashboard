
const themeConfig = {
  app: {
    name: import.meta.env.VITE_APP_NAME,
  },
  logo: {
    "src":  import.meta.env.VITE_APP_LOGO,
    "width": import.meta.env.VITE_APP_LOGO_WIDTH,
    "height": import.meta.env.VITE_APP_LOGO_HEIGHT,
  },
  layout: {
    isRTL: false,
    darkMode: false,
    sidebar: {
      sticky: true,
      logo: false,
      width: "275px",
      menu: {
        isCollapsed: false,
        mobile: false
      } 
    },
    customizer: false,
  },
};

export default themeConfig;