package com.ohgnarly

import com.google.gson.Gson
import com.ohgnarly.fileripper.FileDefinition
import com.ohgnarly.fileripper.FileRipper
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.http.*
import io.ktor.http.HttpStatusCode.Companion.InternalServerError
import io.ktor.http.content.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import java.io.File
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
        post("/api/rip-file") {
            try {
                val multipart = call.receiveMultipart()
                val fileDemo = FileDemo.build(multipart)
                val fileOutput = FileRipper().ripFile(fileDemo.file, fileDemo.fileDefinition)
                call.respond(fileOutput)
            } catch (ex: Exception) {
                call.respond(InternalServerError, ex.message!!)
            } finally {
                File("files/").listFiles()?.forEach { file ->
                    file.deleteRecursively()
                }
            }
        }

        static("/") {
            defaultResource("index.html", "clientApp")
            resources("clientApp")
        }
    }
}

class FileDemo {
    lateinit var file: File
    lateinit var fileDefinition: FileDefinition

    companion object {
        suspend fun build(multiPartData: MultiPartData): FileDemo {
            val fileDemo = FileDemo()
            val parts = multiPartData.readAllParts();
            for (part in parts) {
                when (part) {
                    is PartData.FileItem -> {
                        val name = File(part.originalFileName ?: "").nameWithoutExtension
                        val ext = File(part.originalFileName ?: "").extension
                        fileDemo.file = createFile(name, ext)
                        fileDemo.file.writeBytes(part.streamProvider().readBytes())
                    }
                    is PartData.FormItem -> {
                        fileDemo.fileDefinition = Gson().fromJson(part.value, FileDefinition::class.java)
                    }
                }

                part.dispose()
            }

            return fileDemo
        }
    }
}


