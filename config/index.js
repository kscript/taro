const config = {
  projectName: 'taro',
  date: '2018-9-25',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    },
    typescript: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        baseUrl: '.',
        declaration: false,
        experimentalDecorators: true,
        jsx: 'preserve',
        jsxFactory: 'Nerv.createElement',
        module: 'commonjs',
        moduleResolution: 'node',
        noImplicitAny: false,
        noUnusedLocals: true,
        outDir: './dist/',
        preserveConstEnums: true,
        removeComments: false,
        rootDir: '.',
        sourceMap: true,
        strictNullChecks: true,
        target: 'es6'
      },
      include: [
        'src/**/*'
      ],
      exclude: [
        'node_modules'
      ],
      compileOnSave: false
    }
  },
  defineConstants: {
  },
  weapp: {
    compile: {
      exclude: [
        'src/assets/sdk/NIM_Web_SDK_v5.3.0.js',
        'src/assets/sdk/NIM_Web_SDK_v5.6.0.js'
      ]
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    webpackChain : (chain, webpack) => {
      // chain.merge({
      //     module: {
      //       rule: {
      //         jsx: {
      //           test: /\.js$/,
      //           exclude: [/sdk/]
      //         }
      //       }
      //     }
      // })
    },
    // webpackChain: config => {
    //   config.module
    //   .rule('jsx')
    //   .test(/\.js$/)
    //   .pre()
    //   .exclude
    //   .add(/sdk/)
    //   .end()
    // },
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
