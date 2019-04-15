# Description

Web frontend server which uses [Next JS](https://github.com/zeit/next.js) framework 

# Web server

## 1. Go to web folder
```bash
$ cd web-next-antd
```

## 2. Install dependencies

```bash
$ npm install
```

## 3. Run

```bash
$ npm run dev
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

# Reference
1. [star war example (REST API to graphql)](https://nec.is/writing/graphql-with-next-js-and-apollo/)
2. [puppy dogs](https://codesandbox.io/s/r5qp83z0yq)

# Issues

## 1. Question: Can i access mutation instance inside class functions with <Mutation /> tag
https://github.com/apollographql/apollo-client/issues/3760

## 2. Execute a mutation on mount
https://github.com/apollographql/react-apollo/issues/1939

## 3. chunk styles [mini-css-extract-plugin]
Conflicting order between:
 * css ./node_modules/css-loader??ref--5-2!./node_modules/less-loader/dist/cjs.js??ref--5-3!./node_modules/antd/lib/form/style/index.less
 * css ./node_modules/css-loader??ref--5-2!./node_modules/less-loader/dist/cjs.js??ref--5-3!./node_modules/antd/lib/icon/style/index.less
 * css ./node_modules/css-loader??ref--5-2!./node_modules/less-loader/dist/cjs.js??ref--5-3!./node_modules/antd/lib/tooltip/style/index.less
 * css ./node_modules/css-loader??ref--5-2!./node_modules/less-loader/dist/cjs.js??ref--5-3!./node_modules/antd/lib/checkbox/style/index.less

https://github.com/zeit/next-plugins/pull/315
https://github.com/zeit/next.js/issues/5098

next.config.js didn't resolve it

```js
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  webpack: (config) => {
    const newConfig = { ...config };
    newConfig.plugins = [
      ...config.plugins,
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    ];
    return newConfig;
  },
});  
```


https://github.com/webpack-contrib/mini-css-extract-plugin/issues/362
ignoreOrder: true

https://github.com/ant-design/ant-design/pull/15599  
https://github.com/ant-design/ant-design/issues/14895