package controllers

import javax.inject._

import play.api.mvc._
import play.api.i18n._
import play.api.libs.json._
import models.BulletJournalModel
import models.DataTypes._

import scala.concurrent._
import play.api.db.slick._
import slick.jdbc._
import slick.jdbc.PostgresProfile.api._

@Singleton
class MainController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) 
  extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val model = new BulletJournalModel(db)
  implicit val taskReads = Json.reads[Task]
  implicit val dayReads = Json.reads[Day]
  implicit val habitReads = Json.reads[Habit]
  implicit val taskWrites = Json.writes[Task]
  implicit val dayWrites = Json.writes[Day]
  implicit val habitWrites = Json.writes[Habit]
  
  //Loads Json of type A and calls function with that data
  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) =>
          println("Error in LoginController: " + e)
          Future.successful(Ok(Json.toJson(false)))
      }
    }.getOrElse {
      println("Error in LoginController: cannot read JSON body")
      Future.successful(Ok(Json.toJson(false)))
    }
  }

  // Loads user id from session
  def withUserId(f: Int => Future[Result])(implicit request: Request[AnyContent]) = {
    request.session.get("userid").map { userid =>
      f(userid.toInt)
    }.getOrElse(Future.successful(Ok(Json.toJson(false))))
  }

  // Gets all tasks for a user
  def getAllTasks() = Action.async { implicit request =>
    withUserId { userid =>
      model.getAllTasks(userid).map(tasks => Ok(Json.toJson(tasks)))
    }
  }

  // Takes day id and gets all tasks for that day
  def getTasksForDay() = Action.async { implicit request =>
    withUserId { userid =>
      withJsonBody[Int] { dayid =>
        model.getTasksForDay(userid, dayid).map(tasks => Ok(Json.toJson(tasks)))
      }
    }
  }

  // Takes task and adds that task
  def addTask() = Action.async { implicit request =>
    withUserId { userid =>
      withJsonBody[Task] { task =>
        model.addTask(task, userid, task.dayid).map(numAdded => Ok(Json.toJson(numAdded > 0)))
      }
    }
  }

  // Takes task id and removes that task
  def removeTask() = Action.async { implicit request =>
    withJsonBody[Int]{ taskid => 
      model.removeTask(taskid).map(deleted => Ok(Json.toJson(deleted)))
    }
  }

  // Takes task and updates values of that task
  def editTask() = Action.async { implicit request =>
    withJsonBody[Task] { task =>
      model.editTask(task.taskid, task).map(numEdited => Ok(Json.toJson(numEdited > 0)))
    }
  }
  
  // Gets all days for current user
  def getAllDays() = Action.async { implicit request =>
    withUserId { userid =>
      model.getAllDays(userid).map(days => Ok(Json.toJson(days)))
    }
  }

  // Takes day and updates mood for that day
  def editMood() = Action.async { implicit request =>
    withJsonBody[Day] { day =>
      model.editMood(day.dayid, day.mood).map(numEdited => Ok(Json.toJson(numEdited > 0)))
    }
  }

  // Gets habits for current user
  def getHabits() = Action.async { implicit request =>
    withUserId { userid =>
      model.getHabits(userid).map(habits => Ok(Json.toJson(habits)))
    }
  }

  // Takes habit and adds that habit
  def addHabit() = Action.async { implicit request =>
    withUserId { userid =>
      withJsonBody[Habit] { habit =>
        model.addHabit(habit, userid).map(numAdded => Ok(Json.toJson(numAdded > 0)))
      }
    }
  }

  // Takes habit id and removes that habit
  def removeHabit() = Action.async { implicit request =>
    withJsonBody[Int] { habitid =>
      model.removeHabit(habitid).map(deleted => Ok(Json.toJson(deleted)))
    }
  }

  // Takes habit and updates values of that habit
  def editHabit() = Action.async { implicit request =>
    withJsonBody[Habit] { habit =>
      model.editHabit(habit.habitid, habit).map(numUpdated => Ok(Json.toJson(numUpdated > 0)))
    }
  }
}