package models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.jdbc.PostgresProfile
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.jdbc.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Days.schema ++ Friends.schema ++ Habits.schema ++ Tasks.schema ++ Users.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Days
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param date Database column date SqlType(date)
   *  @param mood Database column mood SqlType(int4), Default(None)
   *  @param userId Database column user_id SqlType(int4) */
  case class DaysRow(id: Int, date: java.sql.Date, mood: Option[Int] = None, userId: Int)
  /** GetResult implicit for fetching DaysRow objects using plain SQL queries */
  implicit def GetResultDaysRow(implicit e0: GR[Int], e1: GR[java.sql.Date], e2: GR[Option[Int]]): GR[DaysRow] = GR{
    prs => import prs._
    DaysRow.tupled((<<[Int], <<[java.sql.Date], <<?[Int], <<[Int]))
  }
  /** Table description of table days. Objects of this class serve as prototypes for rows in queries. */
  class Days(_tableTag: Tag) extends profile.api.Table[DaysRow](_tableTag, "days") {
    def * = (id, date, mood, userId) <> (DaysRow.tupled, DaysRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(date), mood, Rep.Some(userId))).shaped.<>({r=>import r._; _1.map(_=> DaysRow.tupled((_1.get, _2.get, _3, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column date SqlType(date) */
    val date: Rep[java.sql.Date] = column[java.sql.Date]("date")
    /** Database column mood SqlType(int4), Default(None) */
    val mood: Rep[Option[Int]] = column[Option[Int]]("mood", O.Default(None))
    /** Database column user_id SqlType(int4) */
    val userId: Rep[Int] = column[Int]("user_id")

    /** Foreign key referencing Users (database name days_user_id_fkey) */
    lazy val usersFk = foreignKey("days_user_id_fkey", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Days */
  lazy val Days = new TableQuery(tag => new Days(tag))

  /** Entity class storing rows of table Friends
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param friendId Database column friend_id SqlType(int4) */
  case class FriendsRow(id: Int, friendId: Int)
  /** GetResult implicit for fetching FriendsRow objects using plain SQL queries */
  implicit def GetResultFriendsRow(implicit e0: GR[Int]): GR[FriendsRow] = GR{
    prs => import prs._
    FriendsRow.tupled((<<[Int], <<[Int]))
  }
  /** Table description of table friends. Objects of this class serve as prototypes for rows in queries. */
  class Friends(_tableTag: Tag) extends profile.api.Table[FriendsRow](_tableTag, "friends") {
    def * = (id, friendId) <> (FriendsRow.tupled, FriendsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(friendId))).shaped.<>({r=>import r._; _1.map(_=> FriendsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column friend_id SqlType(int4) */
    val friendId: Rep[Int] = column[Int]("friend_id")

    /** Foreign key referencing Users (database name friends_friend_id_fkey) */
    lazy val usersFk = foreignKey("friends_friend_id_fkey", friendId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Friends */
  lazy val Friends = new TableQuery(tag => new Friends(tag))

  /** Entity class storing rows of table Habits
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param description Database column description SqlType(varchar), Length(2000,true)
   *  @param userId Database column user_id SqlType(int4) */
  case class HabitsRow(id: Int, description: String, userId: Int)
  /** GetResult implicit for fetching HabitsRow objects using plain SQL queries */
  implicit def GetResultHabitsRow(implicit e0: GR[Int], e1: GR[String]): GR[HabitsRow] = GR{
    prs => import prs._
    HabitsRow.tupled((<<[Int], <<[String], <<[Int]))
  }
  /** Table description of table habits. Objects of this class serve as prototypes for rows in queries. */
  class Habits(_tableTag: Tag) extends profile.api.Table[HabitsRow](_tableTag, "habits") {
    def * = (id, description, userId) <> (HabitsRow.tupled, HabitsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(description), Rep.Some(userId))).shaped.<>({r=>import r._; _1.map(_=> HabitsRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column description SqlType(varchar), Length(2000,true) */
    val description: Rep[String] = column[String]("description", O.Length(2000,varying=true))
    /** Database column user_id SqlType(int4) */
    val userId: Rep[Int] = column[Int]("user_id")

    /** Foreign key referencing Users (database name habits_user_id_fkey) */
    lazy val usersFk = foreignKey("habits_user_id_fkey", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Habits */
  lazy val Habits = new TableQuery(tag => new Habits(tag))

  /** Entity class storing rows of table Tasks
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param title Database column title SqlType(varchar), Length(200,true)
   *  @param completed Database column completed SqlType(bool)
   *  @param description Database column description SqlType(varchar), Length(2000,true)
   *  @param dueDate Database column due_date SqlType(date), Default(None)
   *  @param reminder Database column reminder SqlType(date), Default(None)
   *  @param userId Database column user_id SqlType(int4)
   *  @param dayId Database column day_id SqlType(int4) */
  case class TasksRow(id: Int, title: String, completed: Boolean, description: String, dueDate: Option[java.sql.Date] = None, reminder: Option[java.sql.Date] = None, userId: Int, dayId: Int)
  /** GetResult implicit for fetching TasksRow objects using plain SQL queries */
  implicit def GetResultTasksRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Boolean], e3: GR[Option[java.sql.Date]]): GR[TasksRow] = GR{
    prs => import prs._
    TasksRow.tupled((<<[Int], <<[String], <<[Boolean], <<[String], <<?[java.sql.Date], <<?[java.sql.Date], <<[Int], <<[Int]))
  }
  /** Table description of table tasks. Objects of this class serve as prototypes for rows in queries. */
  class Tasks(_tableTag: Tag) extends profile.api.Table[TasksRow](_tableTag, "tasks") {
    def * = (id, title, completed, description, dueDate, reminder, userId, dayId) <> (TasksRow.tupled, TasksRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(title), Rep.Some(completed), Rep.Some(description), dueDate, reminder, Rep.Some(userId), Rep.Some(dayId))).shaped.<>({r=>import r._; _1.map(_=> TasksRow.tupled((_1.get, _2.get, _3.get, _4.get, _5, _6, _7.get, _8.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column title SqlType(varchar), Length(200,true) */
    val title: Rep[String] = column[String]("title", O.Length(200,varying=true))
    /** Database column completed SqlType(bool) */
    val completed: Rep[Boolean] = column[Boolean]("completed")
    /** Database column description SqlType(varchar), Length(2000,true) */
    val description: Rep[String] = column[String]("description", O.Length(2000,varying=true))
    /** Database column due_date SqlType(date), Default(None) */
    val dueDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("due_date", O.Default(None))
    /** Database column reminder SqlType(date), Default(None) */
    val reminder: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("reminder", O.Default(None))
    /** Database column user_id SqlType(int4) */
    val userId: Rep[Int] = column[Int]("user_id")
    /** Database column day_id SqlType(int4) */
    val dayId: Rep[Int] = column[Int]("day_id")

    /** Foreign key referencing Days (database name tasks_day_id_fkey) */
    lazy val daysFk = foreignKey("tasks_day_id_fkey", dayId, Days)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Users (database name tasks_user_id_fkey) */
    lazy val usersFk = foreignKey("tasks_user_id_fkey", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Tasks */
  lazy val Tasks = new TableQuery(tag => new Tasks(tag))

  /** Entity class storing rows of table Users
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param username Database column username SqlType(varchar), Length(20,true)
   *  @param password Database column password SqlType(varchar), Length(200,true)
   *  @param fullname Database column fullname SqlType(varchar), Length(30,true)
   *  @param email Database column email SqlType(varchar), Length(40,true) */
  case class UsersRow(id: Int, username: String, password: String, fullname: String, email: String)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[Int], e1: GR[String]): GR[UsersRow] = GR{
    prs => import prs._
    UsersRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends profile.api.Table[UsersRow](_tableTag, "users") {
    def * = (id, username, password, fullname, email) <> (UsersRow.tupled, UsersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(username), Rep.Some(password), Rep.Some(fullname), Rep.Some(email))).shaped.<>({r=>import r._; _1.map(_=> UsersRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column username SqlType(varchar), Length(20,true) */
    val username: Rep[String] = column[String]("username", O.Length(20,varying=true))
    /** Database column password SqlType(varchar), Length(200,true) */
    val password: Rep[String] = column[String]("password", O.Length(200,varying=true))
    /** Database column fullname SqlType(varchar), Length(30,true) */
    val fullname: Rep[String] = column[String]("fullname", O.Length(30,varying=true))
    /** Database column email SqlType(varchar), Length(40,true) */
    val email: Rep[String] = column[String]("email", O.Length(40,varying=true))
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))
}
