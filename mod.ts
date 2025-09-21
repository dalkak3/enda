// @ts-types="https://denopkg.com/dalkak3/enzo@0.1.1/src/type/mod.ts"
import {
    projectSchema,
    objectSchema,
    pictureSchema,
    soundSchema,
    blockSchema,
} from "https://esm.sh/gh/dalkak3/enzo@0.1.1/src/type/mod.ts"

import { Block, Folder, Literal } from "./src/type.ts"

type Project = ReturnType<typeof projectSchema.parse>
type Object_ = ReturnType<typeof objectSchema.parse>
type Picture = ReturnType<typeof pictureSchema.parse>
type Sound = ReturnType<typeof soundSchema.parse>
type EntryBlock = ReturnType<typeof blockSchema.parse>

const meta =
(record: Record<string, Literal>) => Block(
    "when init",
    Object.entries(record)
        .map(([k, v]) => Block(`set ${k}`, v)),
)

const Picture =
(picture: Picture) => Folder(
    picture.name,
    [],
    [
        meta({
            width: picture.dimension.width,
            height: picture.dimension.height,
        }),
    ],
)

const Sound =
(sound: Sound) => Folder(
    sound.name,
    [],
    [
        meta({
            src: sound.fileurl || sound.filename || "",
        }),
    ],
)

const Block_ =
(block: EntryBlock): Block => [
    block.type,
    ...block.params
        .filter(x => x != null)
        .map(x => typeof x == "object" ? Block_(x) : x),
    ...(block.statements || [])
        .filter(x => !!x)
        .map(x => x.map(Block_))
]

const Object_ =
(object: Object_) => Folder(
    object.name,
    [
        ...object.sprite.pictures.map(Picture),
        ...object.sprite.sounds.map(Sound),
    ],
    [
        meta({
            width: object.entity.width,
            height: object.entity.height,
        }),
        ...object.script.flatMap(blocks => blocks
            .filter(x => x.type != "comment")
            .map(x => Block_(x as EntryBlock))
        ),
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
