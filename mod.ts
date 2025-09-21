// @ts-types="https://denopkg.com/dalkak3/enzo@0.1.0/src/type/mod.ts"
import { projectSchema } from "https://esm.sh/gh/dalkak3/enzo@0.1.0/src/type/mod.ts"
import { fib } from "https://esm.sh/gh/dalkak3/ente@0.1.1/case/mod.ts?standalone"

const p = projectSchema.parse(fib as any)

const object = p.objects.at(0)!

console.log(object.script)
