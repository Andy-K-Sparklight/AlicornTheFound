import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/Main.ts",
    output: {
      file: "build/Main.js",
      format: "iife",
    },
    external: ["neutralinojs-types"],
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs({
        include: "node_modules/**",
      }),
    ],
  },
];
