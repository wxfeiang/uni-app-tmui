import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import type { ConfigEnv } from "vite";
import { loadEnv } from "vite";
export default ({ command, mode }: ConfigEnv) => {
  console.log("🍔[command]:", command);
  const env = loadEnv(mode, __dirname);
  const result = {
    plugins: [
      uni(),
      vueJsx(),
      // Unocss({
      //   presets: [presetUno()],
      // }),
      // 加上下面的配置
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          "vue",
          "uni-app",
          "pinia",
          {
            from: "uni-mini-router",
            imports: ["createRouter", "useRouter", "useRoute"],
          },
        ],
        dirs: ["src/composables/**/*", "src/pages/**/*"],
        dts: "typings/auto-imports.d.ts",
      }),
      Components({
        // 可以让我们使用自己定义组件的时候免去 import 的麻烦
        dirs: ["src/components"], // 默认为 src/components
        dts: "typings/components.d.ts", // 可以自定义文件生成的位置，默认是根目录下
        extensions: ["vue", "md", "jsx", "ts", "tsx"], // 配置需要将哪些后缀类型的文件进行自动按需引入
        // 第三方组件库的解析器
        resolvers: [],
      }),
    ],
    // define: {
    //   ROUTES: new TransformPages().routes,
    // },
    build: {
      target: "es6",
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    server: {
      host: "0.0.0.0",
      // 端口
      port: env.VITE_PORT,
      // 运行时自动打开浏览器s
      open: env.VITE_OPEN,
      https: false,
      // 代理配置
      proxy: {
        [env.VITE_BASE_API]: {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(
              new RegExp(`^${env.VITE_BASE_API}`),
              env.VITE_BASE_API,
            ),
        },
      },
    },
  };
  return result;
};
