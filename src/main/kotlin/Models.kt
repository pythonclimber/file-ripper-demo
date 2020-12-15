package com.ohgnarly


class FileType {
    lateinit var name: String
    lateinit var value: String

    companion object {
        fun build(name: String, value: String): FileType {
            return FileType().apply {
                this.name = name
                this.value = value
            }
        }
    }
}