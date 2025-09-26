export const customInputTheme = {
  base: "flex",
  addon:
    "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900",
  field: {
    base: "relative w-full ",
    input: {
      base: "block w-full border h-9 lg:h-10 text-[11px] md:text-[12px] disabled:cursor-not-allowed disabled:opacity-50",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4",
      },
      colors: {
        gray: "bg-white border border-solid border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#2563eb] focus:ring-[#2563eb]",
      },
    },
  },
};

export const dropDownTheme = {
  base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm",
  field: {
    base: "relative w-full ",
    select: {
      base: "block w-full border h-9 lg:h-10 text-[11px] md:text-[12px] disabled:cursor-not-allowed disabled:opacity-50",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4",
      },
      colors: {
        gray: "bg-white border border-solid border-gray-300 placeholder-gray-400 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb]",
      },
    },
  },
  withShadow: {
    on: "shadow-sm ",
    off: "",
  },
};

export const checkboxTheme = {
  root: {
    base: "h-4 w-4 rounded border-2 border-solid border-gray-800 bg-gray-100 focus:ring-2 mr-6",
    color: {
      dark: "text-gray-800 focus:ring-gray-50 ",
      gray: "text-gray-900 focus:ring-gray-900",
    },
  },
};

export const buttonTheme = {
  base: "group relative flex items-stretch justify-center p-0.5 text-center font-medium focus:z-10 focus:outline-none",
  fullSized: "w-full",
  color: {
    cyan: "border border-cyan-300 bg-white text-cyan-900 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-100",
    dark: "border border-transparent bg-gray-800 text-white focus:ring-4 focus:ring-gray-300 enabled:hover:bg-gray-900 ",
    gray: ":ring-cyan-700 border border-gray-200 bg-white text-brand-1000 focus:text-cyan-700 focus:ring-0 enabled:hover:bg-gray-100 enabled:hover:text-brand-1000 ",
    success:
      "border border-transparent bg-green-700 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-green-800 ",
  },
  disabled: "cursor-not-allowed opacity-50",
  isProcessing: "cursor-wait",
  spinnerSlot: "absolute top-0 flex h-full items-center",
  spinnerLeftPosition: {
    xs: "left-2",
    sm: "left-3",
  },
  gradient: {
    cyan: "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br ",
    info: "bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br  ",
    success:
      "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-gradient-to-br ",
  },
  outline: {
    color: {
      gray: "border-2 border-brand-1000 text-brand-1000",
      default: "border-0",
      light: "",
    },
    off: "",
    on: "flex w-full justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit",
    pill: {
      off: "rounded-md",
      on: "rounded-full",
    },
  },
  pill: {
    off: "rounded-lg",
    on: "rounded-full",
  },
  size: {
    xs: "px-2 py-1 sm:text-xs ",
    sm: "px-3 py-1.5 sm:text-sm",
  },
};

export const otherDropdownTheme = {
  arrowIcon: "ml-2 h-4 w-4 ",
  content: "py-1 focus:outline-none",
  floating: {
    animation: "transition-opacity ",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45 ",
      style: {
        dark: "bg-gray-900",
        light: "bg-white",
        auto: "bg-white",
      },
      placement: "-4px ",
    },
    base: "z-50 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
    content: "py-1 text-sm text-gray-700 ",
    divider: "my-1 h-px bg-gray-100 ",
    header: "block px-4 py-2 text-sm text-gray-700 ",
    hidden: "invisible opacity-0",
    item: {
      container: "",
      base: " flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
      icon: "mr-2 h-4 w-4",
    },
    style: {
      dark: "bg-gray-900 text-white",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900",
    },
    target:
      "w-full bg-transparent ring-0 focus:ring-0 text-gray-900 border-gray-300 border-2 enabled:hover:bg-transparent",
  },
  inlineWrapper: "flex items-center",
};

export const modalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-[0.3]",
      off: "hidden",
    },
    sizes: {
      "2xl": "max-w-2xl",
    },
    positions: {
      "top-left": "items-start justify-start",
      "top-center": "items-start justify-center",
      "top-right": "items-start justify-end",
      "center-left": "items-center justify-start",
      center: "items-center justify-center",
      "center-right": "items-center justify-end",
      "bottom-right": "items-end justify-end",
      "bottom-center": "items-end justify-center",
      "bottom-left": "items-end justify-start",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow ",
  },
  body: {
    base: "flex-1 overflow-auto p-6",
    popup: "pt-0",
  },
  header: {
    base: "flex items-center justify-center rounded-t border-b-0 pr-1",
    popup: "border-b-0 p-2",
    title: "text-lg font-medium text-gray-900 w-2/3",
    close: {
      base: "relative bottom-2  ml-auto cursor-pointer inline-flex items-center rounded-2xl border-0 border-solid bg-gray-300 p-1.5 text-lg text-red-800 hover:bg-gray-200 hover:text-red-900",
      icon: "h-5 w-5  ",
    },
  },
  footer: {
    base: "flex items-center space-x-2 rounded-b border-gray-200 pb-12",
    popup: "border-0",
  },
};
