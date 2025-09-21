// @ts-types="https://denopkg.com/dalkak3/enzo@0.1.0/src/type/mod.ts"
import {
    projectSchema,
    objectSchema,
    pictureSchema,
    soundSchema,
} from "https://esm.sh/gh/dalkak3/enzo@0.1.0/src/type/mod.ts"

import { Block, Folder } from "./src/type.ts"

type Project = ReturnType<typeof projectSchema.parse>
type Object_ = ReturnType<typeof objectSchema.parse>
type Picture = ReturnType<typeof pictureSchema.parse>
type Sound = ReturnType<typeof soundSchema.parse>

const Picture =
(picture: Picture) => Folder(
    picture.name,
    [],
    [
        Block("when init", [
            Block("set width", picture.dimension.width),
            Block("set height", picture.dimension.height),
        ]),
    ],
)

const Sound =
(sound: Sound) => Folder(
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
)

const Object_ =
(object: Object_) => Folder(
    object.name,
    [
        ...object.sprite.pictures.map(Picture),
        ...object.sprite.sounds.map(Sound),
    ],
    [
        Block("when init", [
            Block("set width", object.entity.width),
            Block("set height", object.entity.height),
        ]),
        // todo: object.script
    ],
)

const Project =
(project: Project) =>
    Folder(project.name || project.id || "Unnamed Project", [
        ...project.scenes.map(scene => Folder(scene.name, [
            ...project.objects
                .filter(object => object.scene == scene.id)
                .map(Object_)
        ])),
    ])

import { proj_57d79d29a76b6b017780b483 as proj } from "https://esm.sh/gh/dalkak3/ente@0.1.1/case/mod.ts?standalone"

console.log(
    Project(projectSchema.parse(proj))
)
