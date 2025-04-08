# Resource Content Schema

The resource content can be requested as JSON, markdown, or HTML. Users who just want to display content as is without worrying about their own styling likely will use MD or HTML. However, users who are looking for more control over how the content is presented likely want to pull it as JSON and deserialize it to an object fit for their own application and language needs. The following documentation focuses on the latter and understanding each part of the JSON.

The JSON schema is originally meant to work with the [Tiptap Editor](https://tiptap.dev/). It does, however, include custom marks to hold Bible and Resource references. The [Tiptap schema](https://tiptap.dev/docs/editor/core-concepts/schema) is based off the [ProseMirror schema](https://prosemirror.net/docs/guide/#schema).

### Non-Text Content

Note: This documentation focuses on text content. Other media types, such as audio, images, video, etc., will always return as a simple CDN URL such as

```json
{
    "content": {
        "url": "[image / video url]"
    }
}

{
    "content": {
        "webm": {
            "url": "[cdn url]",
            "size": bytes
        },
        "mp3": {
            "url": "[cdn url]",
            "size": bytes
        }
    }
}
```
### Text Content

The following is an example of JSON returned for text content.

```json
{
    "content":[
        {
            "tiptap":{
                "type":"doc",
                "content":[
                    {
                        "type":"heading",
                        "attrs":{
                            "dir":"ltr",
                            "level":1
                        },
                        "content":[
                            {
                                "type":"text",
                                "text":"\"In the beginning\""
                            }
                        ]
                    },
                    {
                        "type":"paragraph",
                        "attrs":{
                            "dir":"ltr"
                        },
                        "content":[
                            {
                                "type":"text",
                                "text":"The first chapter of Genesis is a true historical narrative (which is indicated by the Hebrew language structures that are used throughout the chapter), and verse 1 records the first event in that history. This is confirmed by the wider context of the Scriptures, which teach us that God created everything out of nothing at the very beginning of the world ("
                            },
                            {
                                "type":"text",
                                "marks":[
                                    {
                                        "type":"bibleReference",
                                        "attrs":{
                                            "verses":[
                                                {
                                                    "startVerse":"1019033006",
                                                    "endVerse":"1019033006"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "text":"Psalm 33:6"
                            },
                            {
                                "type":"text",
                                "text":", "
                            },
                            {
                                "type":"text",
                                "marks":[
                                    {
                                        "type":"bibleReference",
                                        "attrs":{
                                            "verses":[
                                                {
                                                    "startVerse":"1019033009",
                                                    "endVerse":"1019033009"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "text":"9"
                            },
                            {
                                "type":"text",
                                "text":"; "
                            },
                            {
                                "type":"text",
                                "marks":[
                                    {
                                        "type":"bibleReference",
                                        "attrs":{
                                            "verses":[
                                                {
                                                    "startVerse":"1059011003",
                                                    "endVerse":"1059011003"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "text":"Hebrews 11:3"
                            },
                            {
                                "type":"text",
                                "text":"). Some languages must use a verb (“began”) in verse 1 rather than an abstract noun ("
                            },
                            {
                                "type":"text",
                                "marks":[
                                    {
                                        "type":"bold"
                                    }
                                ],
                                "text":"beginning"
                            },
                            {
                                "type":"text",
                                "text":"). Do what is best in your language. Alternate translation: “"
                            },
                            {
                                "type":"text",
                                "marks":[
                                    {
                                        "type":"italic"
                                    }
                                ],
                                "text":"At the beginning of time"
                            },
                            {
                                "type":"text",
                                "text":"”"
                            }
                        ]
                    },
                    {
                        "type":"bulletList",
                        "attrs":{
                            "dir":"ltr"
                        },
                        "content":[
                            {
                                "type":"listItem",
                                "attrs":{
                                    "dir":"ltr"
                                },
                                "content":[
                                    {
                                        "type":"paragraph",
                                        "attrs":{
                                            "dir":"ltr"
                                        },
                                        "content":[
                                            {
                                                "type":"text",
                                                "text":"And here's a"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type":"listItem",
                                "attrs":{
                                    "dir":"ltr"
                                },
                                "content":[
                                    {
                                        "type":"paragraph",
                                        "attrs":{
                                            "dir":"ltr"
                                        },
                                        "content":[
                                            {
                                                "type":"text",
                                                "text":"random "
                                            },
                                            {
                                                "type":"text",
                                                "marks":[
                                                    {
                                                        "type":"underline"
                                                    }
                                                ],
                                                "text":"bullet"
                                            },
                                            {
                                                "type":"text",
                                                "text":" list"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type":"orderedList",
                        "attrs":{
                            "dir":"ltr",
                            "start":1
                        },
                        "content":[
                            {
                                "type":"listItem",
                                "attrs":{
                                    "dir":"ltr"
                                },
                                "content":[
                                    {
                                        "type":"paragraph",
                                        "attrs":{
                                            "dir":"ltr"
                                        },
                                        "content":[
                                            {
                                                "type":"text",
                                                "text":"Here's a"
                                            }
                                        ]
                                    },
                                    {
                                        "type":"orderedList",
                                        "attrs":{
                                            "dir":"ltr",
                                            "start":1
                                        },
                                        "content":[
                                            {
                                                "type":"listItem",
                                                "attrs":{
                                                    "dir":"ltr"
                                                },
                                                "content":[
                                                    {
                                                        "type":"paragraph",
                                                        "attrs":{
                                                            "dir":"ltr"
                                                        },
                                                        "content":[
                                                            {
                                                                "type":"text",
                                                                "text":"numbered list with nesting"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type":"listItem",
                                                "attrs":{
                                                    "dir":"ltr"
                                                },
                                                "content":[
                                                    {
                                                        "type":"paragraph",
                                                        "attrs":{
                                                            "dir":"ltr"
                                                        },
                                                        "content":[
                                                            {
                                                                "type":"text",
                                                                "text":"and a "
                                                            },
                                                            {
                                                                "type":"text",
                                                                "marks":[
                                                                    {
                                                                        "type":"underline"
                                                                    }
                                                                ],
                                                                "text":"mark"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type":"listItem",
                                "attrs":{
                                    "dir":"ltr"
                                },
                                "content":[
                                    {
                                        "type":"paragraph",
                                        "attrs":{
                                            "dir":"ltr"
                                        },
                                        "content":[
                                            {
                                                "type":"text",
                                                "text":"in it"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type":"paragraph",
                        "attrs":{
                            "dir":"ltr"
                        },
                        "content":[
                            {
                                "type":"text",
                                "text":"See: "
                            },
                            {
                                "type":"text",
                                "marks":[
                                    {
                                        "type":"resourceReference",
                                        "attrs":{
                                            "resourceId":"33682",
                                            "resourceType":"UWTranslationManual"
                                        }
                                    }
                                ],
                                "text":"Abstract Nouns"
                            }
                        ]
                    }
                ]
            }
        }
    ]
}
```
At the top level is an array of `content`. Some resource types, such as FIA, can come in multiple steps. Typically, though, `content` will have a length of 1. Within that is a `tiptap` object following the ProseMirror schema. At the top level it specifies that the `type` is "doc" (which is always the case, so it can be ignored).

After this, is another array of `content` objects, or nodes. These nodes make up the text content of the resource, and each node will represent some block of content. For Aquifer content purposes, the nodes will always be either heading, paragraph, bulletList, or orderedList. Note that lists can be nested.

In the example above, the first piece of content is an H1 header:

```json
{
    "type":"heading",
    "attrs":{
        "dir":"ltr",
        "level":1
    },
    "content":[
        {
            "type":"text",
            "text":"\"In the beginning\""
        }
    ]
}
```
The `attrs` object provides some additional information, such as the text being read left-to-right, and the `level` indicates that it's an H1 heading. The further nested `content` then provides the actual text of the heading node. Converted to HTML, the above would look like

```html
<h1 dir="ltr">"In the beginning"</h1>
```

A "heading" will always have a `level` in the `attrs` object. Headings do not contain nested nodes, only text.

Next is a "paragraph" node. Most text content will be part of a paragraph. Paragraphs also do not have nested nodes. However, all nodes can have marks. Marks indicate some sort of styling or custom content on a part of the text. For example, this could indicate that part of the paragraph text is bolded or italicized. It is also used to indicate that a Bible verse reference or a resource reference exists for that text.

```json
{
    "type":"paragraph",
    "attrs":{
        "dir":"ltr"
    },
    "content":[
        {
            "type":"text",
            "text":"The first chapter of Genesis is a true historical narrative (which is indicated by the Hebrew language structures that are used throughout the chapter), and verse 1 records the first event in that history. This is confirmed by the wider context of the Scriptures, which teach us that God created everything out of nothing at the very beginning of the world ("
        },
        {
            "type":"text",
            "marks":[
                {
                    "type":"bibleReference",
                    "attrs":{
                        "verses":[
                            {
                                "startVerse":"1019033006",
                                "endVerse":"1019033006"
                            }
                        ]
                    }
                }
            ],
            "text":"Psalm 33:6"
        },
        {
            "type":"text",
            "text":", "
        },
        {
            "type":"text",
            "marks":[
                {
                    "type":"bibleReference",
                    "attrs":{
                        "verses":[
                            {
                                "startVerse":"1019033009",
                                "endVerse":"1019033009"
                            }
                        ]
                    }
                }
            ],
            "text":"9"
        },
        {
            "type":"text",
            "text":"; "
        },
        {
            "type":"text",
            "marks":[
                {
                    "type":"bibleReference",
                    "attrs":{
                        "verses":[
                            {
                                "startVerse":"1059011003",
                                "endVerse":"1059011003"
                            }
                        ]
                    }
                }
            ],
            "text":"Hebrews 11:3"
        },
        {
            "type":"text",
            "text":"). Some languages must use a verb (“began”) in verse 1 rather than an abstract noun ("
        },
        {
            "type":"text",
            "marks":[
                {
                    "type":"bold"
                }
            ],
            "text":"beginning"
        },
        {
            "type":"text",
            "text":"). Do what is best in your language. Alternate translation: “"
        },
        {
            "type":"text",
            "marks":[
                {
                    "type":"italic"
                }
            ],
            "text":"At the beginning of time"
        },
        {
            "type":"text",
            "text":"”"
        }
    ]
}
```

As with the heading, the paragraph has an `attr` object with a `dir` property. Typically, the reading direction will be the same for all content in a single resource as it's tied to the language. Also like the heading, the `content` is an array of `type` and `text`. However, here some parts of the content have different marks. If there were no marks, then the `content` length would be 1.

At position 0 is the first block of regular text. Position 1 then has the first mark:
```json
{
    "type":"text",
    "marks":[
        {
            "type":"bibleReference",
            "attrs":{
                "verses":[
                    {
                        "startVerse":"1019033006",
                        "endVerse":"1019033006"
                    }
                ]
            }
        }
    ],
    "text":"Psalm 33:6"
}
```
Note that the `type` is still "text", but there is now an additional `mark` property representing the additional extension to the text. The `text` property itself works as everything else. That is the text content. But the "Psalm 33:6" text has a mark on it. The type of the mark is "bibleReference" and the attributes of the mark is a verses array. Each verse has a `startVerse` and an `endVerse` property (which use common English Bible verse numbering). Thus, to parse what a mark is, one must look at the `type` and then parse `attrs` accordingly if relevant.

Further down the `content` array is a mark on the word "beginning" indicating that it is bolded.
```json
{
    "type":"text",
    "marks":[
        {
            "type":"bold"
        }
    ],
    "text":"beginning"
}
```
Since we don't consider font weights, there is no `attrs` property to supplement the "bold" mark type, likewise for "italic" and "underline".

The above paragraph node, if represented by HTML, would look something like
```html
<p dir="ltr">The first chapter of Genesis is a true historical narrative (which is indicated by the Hebrew language structures that are used throughout the chapter), and verse 1 records the first event in that history. This is confirmed by the wider context of the Scriptures, which teach us that God created everything out of nothing at the very beginning of the world (<span data-bntype="bibleReference" data-verses="[[1019033006,1019033006]]">Psalm 33:6</span>, <span data-bntype="bibleReference" data-verses="[[1019033009,1019033009]]">9</span>; <span data-bntype="bibleReference" data-verses="[[1059011003,1059011003]]">Hebrews 11:3</span>). Some languages must use a verb (“began”) in verse 1 rather than an abstract noun (<strong>beginning</strong>). Do what is best in your language. Alternate translation: “<em>At the beginning of time</em>”</p>
```

Next are ordered and unordered list nodes. These mostly have the same structure as headings and paragraphs, except they have a nested "listItem" node that nests a paragraph node to display its content. Further, a listItem can have another listItem nested within it. It's unlikely to encounter deeply nested lists, but parsing these will need some sort of recursive or similar logic. Regardless of nesting, nodes always behave the same way. A mark in a paragraph node will always have the same structure regardless of if it's at the top level or deeply nested.

Finally, at the end is a resource reference mark.
```json
{
    "type":"paragraph",
    "attrs":{
        "dir":"ltr"
    },
    "content":[
        {
            "type":"text",
            "text":"See: "
        },
        {
            "type":"text",
            "marks":[
                {
                    "type":"resourceReference",
                    "attrs":{
                        "resourceId":"33682",
                        "resourceType":"UWTranslationManual"
                    }
                }
            ],
            "text":"Abstract Nouns"
        }
    ]
}
```
This specifies the `resourceId` that can be used to get further information about that resource as well as its type. This a language agnostic id, so the `/resources/{ContentId}/associations` endpoint must be used to get the language specific id associations.

As mentioned, the example here covers typical scenarios. A simple typescript structure representing a node would be the following:

```typescript
interface ContentNode {
    type: string;
    text?: string;
    marks?: Mark[];
    content?: ContentNode[];
    attrs?: {
        level?: number;
        dir?: string;
    };
}

interface Mark {
    type: string;
    attrs?: {
        verses?: VerseReference[];
        resourceId?: string;
        resourceType?: string;
    };
}

interface VerseReference {
    startVerse: string;
    endVerse: string;
}
```
