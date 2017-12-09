import com.beust.kobalt.*
import com.beust.kobalt.plugin.packaging.*
import com.beust.kobalt.plugin.application.*
import com.beust.kobalt.plugin.kotlin.*

val kotlinVersion = "1.1.60"
val ktorVersion = "0.9.0"

val p = project {
    name = "wanted"
    group = "com.example"
    artifactId = name
    version = "0.1"

    buildScript {
        repos("http://dl.bintray.com/kotlin/ktor",
                "https://dl.bintray.com/kotlin/kotlinx",
                "http://dl.bintray.com/kotlin/exposed",
                "https://dl.bintray.com/kotlin/kotlin-eap-1.1")
    }

    dependencies {

        compile("org.jetbrains.kotlin:kotlin-runtime:$kotlinVersion")
        compile("org.jetbrains.kotlin:kotlin-stdlib:$kotlinVersion")

        compile("io.ktor:ktor-server-core:$ktorVersion")
        compile("io.ktor:ktor-server-netty:$ktorVersion")

        compile("com.h2database:h2:1.4.196")


    }

    dependenciesTest {
        compile("org.testng:testng:6.11")
    }

    assemble {
        jar {
        }
    }

    application {
        mainClass = "com.example.MainKt"
    }
}
