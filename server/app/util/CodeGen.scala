package util

object CodeGen extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile", 
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost/bullet_journal?user=charg&password=password",
    "C:/Bullet-Journal/server/app", 
    "models", None, None, true, false
  )
}