import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    outfile: 'index.js',
    bundle: true,
    logLevel: "info",
    platform: "node",
    target: "node16"
})

await ctx.watch()