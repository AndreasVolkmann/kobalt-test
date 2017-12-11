import com.beust.kobalt.*
import com.beust.kobalt.plugin.application.*
import com.beust.kobalt.plugin.packaging.*

val kotlinVersion = "1.2.0"
val ktorVersion = "0.9.0"
val exposedVersion = "0.9.1"
val h2Version = "1.4.196"
val kodeinVersion = "4.1.0"
val logbackVersion = "1.2.3"
val junitVersion = "5.0.2"
val kluentVersion = "1.30"


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
        compile("io.ktor:ktor-gson:$ktorVersion")
        compile("io.ktor:ktor-auth:$ktorVersion")
        compile("org.jetbrains.exposed:exposed:$exposedVersion")
        compile("com.github.salomonbrys.kodein:kodein:$kodeinVersion")

        compile("com.h2database:h2:$h2Version")
        compile("com.auth0:java-jwt:3.3.0")
        compile("org.mindrot:jbcrypt:0.4")
        compile("ch.qos.logback:logback-classic:$logbackVersion")

    }

    dependenciesTest {
        compile("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")
        compile("org.junit.jupiter:junit-jupiter-api:$junitVersion")
        compile("org.amshove.kluent:kluent:$kluentVersion")
        compile("io.ktor:ktor-server-test-host:$ktorVersion")
    }

    assemble {
        jar {}
    }

    application {
        mainClass = "com.example.MainKt"
    }
}


