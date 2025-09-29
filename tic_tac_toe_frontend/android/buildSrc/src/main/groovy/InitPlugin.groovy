import org.gradle.api.Plugin
import org.gradle.api.Project

class InitPlugin implements Plugin<Project> {
    void apply(Project project) {
        project.task('ensureWrapper') {
            doFirst {
                if (!project.file('gradlew').canExecute()) {
                    project.file('gradlew').setExecutable(true)
                }
            }
        }

        project.tasks.matching { it.name != 'ensureWrapper' }.all {
            it.dependsOn 'ensureWrapper'
        }
    }
}
