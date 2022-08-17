import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: "src/Main.ts",
    output: {
      file: "build/Main.js",
      format: "iife",
    },
    external: ["neutralinojs-types", "Aria2"],
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs({
        include: "node_modules/**",
      }),
      json(),
      terser(),
    ],
  },
];
