// @ts-types="https://denopkg.com/dalkak3/enzo@0.1.0/src/type/mod.ts"
import { projectSchema } from "https://esm.sh/gh/dalkak3/enzo@0.1.0/src/type/mod.ts"

import { Block, Folder } from "./src/type.ts"

type Project = ReturnType<typeof projectSchema.parse>


const convert =
(project: Project) =>
    Folder(project.name || project.id || "Unnamed Project", [
        ...project.scenes.map(scene => Folder(scene.name, [
            ...project.objects
                .filter(object => object.scene == scene.id)
                .map(object => Folder(
                    object.name,
                    [
                        ...object.sprite.pictures.map(picture => Folder(
                            picture.name,
                            [],
                            [
                                Block("when init", [
                                    Block("set width", picture.dimension.width),
                                    Block("set height", picture.dimension.height),
                                ]),
                            ],
                        )),
                        ...object.sprite.sounds.map(sound => Folder(
                            sound.name,
                            [],
                            [
                                Block("when init", [
                                    Block("set src",
                                        sound.fileurl
                                        || sound.filename
                                        || ""
                                    ),
                                    Block("set duration", sound.duration),
                                ]),
                            ],
                        )),
                    ],
                    [
                        Block("when init", [
                            Block("set width", object.entity.width),
                            Block("set height", object.entity.height),
                        ]),
                        // todo: object.script
                    ],
                ))
        ])),
    ])

import { proj_57d79d29a76b6b017780b483 as proj } from "https://esm.sh/gh/dalkak3/ente@0.1.1/case/mod.ts?standalone"

console.log(
    convert(projectSchema.parse(proj))
)
