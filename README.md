# electron-nuxt-typescript-20200604

# Nuxt.js

## create-nuxt-app

```
% npx create-nuxt-app example

create-nuxt-app v2.15.0
✨  Generating Nuxt.js project in example
? Project name example
? Project description My exquisite Nuxt.js project
? Author name abetomo
? Choose programming language TypeScript
? Choose the package manager Npm
? Choose UI framework Buefy
? Choose custom server framework None (Recommended)
? Choose the runtime for TypeScript Default
? Choose Nuxt.js modules (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose linting tools (Press <space> to select, <a> to toggle all, <i> to invert selection)ESLint, Prettier, Lint stage
d files, StyleLint
? Choose test framework Jest
? Choose rendering mode Single Page App
? Choose development tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
```

### eslint error

```diff
--- a/nuxt.config.js
+++ b/nuxt.config.js
@@ -50,6 +50,6 @@ export default {
     /*
      ** You can extend webpack config here
      */
-    extend(config, ctx) {}
+    extend(config, ctx) {} // eslint-disable-line
   }
 }
```
## `lang="ts"`

```diff
--- a/components/Card.vue
+++ b/components/Card.vue
@@ -22,7 +22,7 @@
   </div>
 </template>
_
-<script>
+<script lang="ts">
 export default {
   props: {
     title: {
```

```diff
--- a/layouts/default.vue
+++ b/layouts/default.vue
@@ -39,7 +39,7 @@
   </div>
 </template>
_
-<script>
+<script lang="ts">
 export default {
   data() {
     return {
```

```diff
--- a/pages/index.vue
+++ b/pages/index.vue
@@ -33,8 +33,8 @@
   </section>
 </template>
_
-<script>
-import Card from '~/components/Card'
+<script lang="ts">
+import Card from '~/components/Card.vue'
_
 export default {
   name: 'HomePage',
```

# Electron

## install

```
% npm i -D electron
```

## change

```
% touch preload.js
```

Add [main.js](./example/main.js)

```diff
--- a/nuxt.config.js
+++ b/nuxt.config.js
@@ -1,4 +1,6 @@
-export default {
+const baseDir = process.env.BASE_DIR || '/'
+
+module.exports = { // eslint-disable-line
   mode: 'spa',
   /*
    ** Headers of the page
@@ -51,5 +53,11 @@ export default {
      ** You can extend webpack config here
      */
     extend(config, ctx) {} // eslint-disable-line
+  },
+  // dev mode
+  dev: process.env.NODE_ENV === 'dev',
+  router: {
+    base: baseDir,
+    mode: 'hash'
   }
 }
```

```diff
--- a/package.json
+++ b/package.json
   "private": true,
   "scripts": {
-    "dev": "nuxt",
+    "dev": "NODE_ENV=dev electron main.js",
     "build": "nuxt build",
     "start": "nuxt start",
     "generate": "nuxt generate",
```

## build

```
% npm i -D electron-builder
```

```diff
--- a/.gitignore
+++ b/.gitignore
@@ -88,3 +88,6 @@ sw.*

 # Vim swap files
 *.swp
+
+# electron-builder
+build
```

```diff
--- a/package.json
+++ b/package.json
@@
     "dev": "NODE_ENV=dev electron main.js",
     "build": "nuxt build",
+    "electron-builder": "BASE_DIR=./ NODE_ENV=production npm run build && electron-builder -w portable -m --x64",
     "start": "nuxt start",
     "generate": "nuxt generate",
     "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
@@
     "stylelint": "^10.1.0",
     "ts-jest": "^25.0.0",
     "vue-jest": "^4.0.0-0"
+  },
+  "main": "main.js",
+  "build": {
+    "appId": "example",
+    "directories": {
+      "output": "build"
+    }
   }
```

## Added on 2020/12/19

Breaking Changes
https://www.electronjs.org/docs/breaking-changes#breaking-changes
