plugins {
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(":jvm-shared"))

    testImplementation(libs.junit.jupiter)
}

application {
    mainClass.set("com.signavio.App")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
