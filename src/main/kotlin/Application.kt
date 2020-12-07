package com.ohgnarly

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.http.content.*
import io.ktor.response.*
import io.ktor.routing.*
import java.text.DateFormat

fun main(args: Array<String>): Unit = io.ktor.server.tomcat.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(ContentNegotiation) {
        gson {
            setDateFormat(DateFormat.LONG)
            setPrettyPrinting()
        }
    }

//    install(CORS) {
//        host("localhost:4200")
//    }

    routing {
        get("/api/file-types") {
            val fileTypes = mutableListOf<FileType>().apply {
                add(FileType.build("Fixed Width", "FIXED"))
                add(FileType.build("Character Delimited", "DELIMITED"))
                add(FileType.build("Xml", "XML"))
            }
            call.respond(fileTypes)
        }

        static("/") {
            defaultResource("index.html", "clientApp")
            resources("clientApp")
        }
    }
}

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