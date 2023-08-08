plugins {
    application
    alias(libs.plugins.kotlin.jvm)
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(":jvm-shared"))

    testImplementation(libs.junit.jupiter)
}

application {
    mainClass.set("com.signavio.AppKt")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
