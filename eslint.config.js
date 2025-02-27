import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import doFormatting from "@vue/eslint-config-prettier"

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"]
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  doFormatting
]
