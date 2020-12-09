package com.ohgnarly

import com.ohgnarly.fileripper.FieldDefinition
import com.ohgnarly.fileripper.FileDefinition
import com.ohgnarly.fileripper.FileType.DELIMITED
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.http.*
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

    install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.Authorization)
        allowCredentials = true
        allowNonSimpleContentTypes = true
        anyHost()
    }

    routing {
        get("/api/file-types") {
            val fileTypes = mutableListOf<FileType>().apply {
                add(FileType.build("Fixed Width", "FIXED"))
                add(FileType.build("Character Delimited", "DELIMITED"))
                add(FileType.build("Xml", "XML"))
            }
            call.respond(fileTypes)
        }

        post("/api/rip-file") {
            val fieldDefs = mutableListOf<FieldDefinition>().apply {
                this.add(FieldDefinition().apply { fieldName = "name" })
                this.add(FieldDefinition().apply { fieldName = "age" })
                this.add(FieldDefinition().apply { fieldName = "dob" })
            }
            val fileDef = FileDefinition().apply {
                this.delimiter = "|"
                this.hasHeader = true
                this.fileType = DELIMITED
                this.fileMask = "Valid-*.txt"
                this.fieldDefinitions = fieldDefs
            }
            call.respond(fileDef)
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