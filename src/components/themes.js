export const customInputTheme = {
  base: "flex",
  addon:
    "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900",
  field: {
    base: "relative w-full",
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4",
      },
      colors: {
        gray: "bg-white border border-solid border-gray-300 text-gray-900 placeholder-gray-400 focus:border-slate-500 focus:ring-slate-500",
      },
    },
  },
};
