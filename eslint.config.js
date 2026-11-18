import eslint from '@eslint/js'
import globals from 'globals'
import reactHooks from '@eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importSort from 'eslint-plugin-simple-import-sort'
import eslintPrettier from 'eslint-plugin-prettier'
import tseslint  from 'typescript-eslint'


const packagesConfig ={
  files:['packages/**/*.{ts,tsx}'],
  languageOptions:{
    globals:{
      ...globals.browser,
    }
  },

  rules:{
  "no-console":'error'
}
};
const frontendConfig ={
  files:['app/frontend/mointor/**/*.{ts,tsx}'],
  languageOptions:{
    globals:{
      ...globals.browser,
    }
  },
  plugins:{
    'react-hooks':reactHooks,
    'react-refresh':reactRefresh
  },
  rules:{
    ...reactHooks.configs.recommended.rules,
    'react-refresh/pnly-export-components':["warn",{
      allowConstantExport:true
    },
  ],
  "no-console":'error'
}
};
const backendConfig ={
  files:['app/backend/**/*.{ts,tsx}'],
  languageOptions:{
    globals:{
      ...globals.node,
      ...globals.jest,
    },
    parser:tseslint.parser
  },
  plugins:{
    'react-hooks':reactHooks,
    'react-refresh':reactRefresh
  },
  rules:{
    "@typescript-eslint/no-explicit-any":"off",
    "@typescript-eslint/interface-name-prefix":"off",
    "no-console":"error",
    "@typescript-eslint/explicit-function-return-type":"off",
    "@typescript-eslint/explicit-module-boundary-types":"off",
}
};

const ignores =[
  "dist",
  "build",
  "**/*.js",
  "**/*.d.ts",
  "**/*.mjs",
  'eslint.config.js',
  "commitlint.config.js",
  "apps/frontend/monitor/src/components/ui/**/*",
  "packages/browser-utils/src/metrics/**/*"
]


export default tseslint.config({
  files:["**/*.{ts,tsx}"],
  ignores,
  extends:[
    eslint.config.recommended,
    ...tseslint.configs.recommended,
   ],
  rules: {
    "prettier/prettier":"error",
    "simple-import-sort/imports":'error'
  },
  plugins:{
    prettier:eslintPrettier,
    'simple-import-sort':importSort
  }
},backendConfig,frontendConfig,packagesConfig)