package models

object DataTypes {
    //case class Task(title: String, completed: Boolean, dueDate: Option[LocalDateTime], reminder: Option[LocalDateTime])
    case class Task(title: String, description: String, completed: Boolean)
}